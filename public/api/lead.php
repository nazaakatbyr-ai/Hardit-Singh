<?php
/**
 * Hostinger PHP Lead Receiver for NazaakatbyR
 * 
 * Upload this file to your Hostinger website (e.g. public_html/api/lead.php)
 * This handles customer enquiry submissions from the Nazaakat Concierge widget
 * and dispatches notification emails to nazaakatbyr@gmail.com.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Parse JSON Payload
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    exit;
}

$name = htmlspecialchars(trim($data['name'] ?? ''));
$phone = htmlspecialchars(trim($data['phone'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$product = htmlspecialchars(trim($data['product'] ?? 'General Enquiry'));
$requirement = htmlspecialchars(trim($data['requirement'] ?? ''));

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields: name and phone are required.'
    ]);
    exit;
}

// Recipient
$toEmail = 'nazaakatbyr@gmail.com';
$subject = 'New NazaakatbyR Website Chatbot Enquiry - ' . $name;

$dateFormatted = date('j M Y, g:i a');

$emailBody = "New customer enquiry received from the NazaakatbyR website chatbot.\n\n";
$emailBody .= "Customer Name:\n" . $name . "\n\n";
$emailBody .= "Phone:\n" . $phone . "\n\n";
if (!empty($email)) {
    $emailBody .= "Email:\n" . $email . "\n\n";
}
if (!empty($product)) {
    $emailBody .= "Product / Outfit of Interest:\n" . $product . "\n\n";
}
if (!empty($requirement)) {
    $emailBody .= "Requirement / Message:\n" . $requirement . "\n\n";
}
$emailBody .= "Date:\n" . $dateFormatted . "\n";
$emailBody .= "Source: NazaakatbyR AI Concierge on Hostinger\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Nazaakat Concierge <concierge@nazaakatbyr.com>';
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail($toEmail, $subject, $emailBody, implode("\r\n", $headers));

// Log locally if writable
$logEntry = date('[Y-m-d H:i:s]') . " Lead: {$name} | Phone: {$phone} | Product: {$product} | MailSent: " . ($mailSent ? 'YES' : 'NO') . "\n";
@file_put_contents(__DIR__ . '/leads.log', $logEntry, FILE_APPEND);

echo json_encode([
    'success' => true,
    'message' => 'Thank you. Your enquiry has been shared with the NazaakatbyR team. We’ll assist you with the details provided.',
    'mail_sent' => $mailSent,
    'lead' => [
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'product' => $product,
        'requirement' => $requirement,
        'timestamp' => date('c'),
    ]
]);
