import React, { useState, useEffect, useCallback } from 'react';

// Data for all the tasks and quizzes
const tasksData = [
    {
        id: 'task1',
        title: 'Identify Suspicious Emails',
        learningContent: {
            title: 'Understanding Email Phishing',
            description: 'Email phishing is the most common form of cyber attack. Attackers send fraudulent messages designed to trick you into revealing sensitive information (like passwords or credit card numbers) or deploying malicious software, such as ransomware.',
            image: 'https://www.msvu.ca/wp-content/uploads/2017/10/2024-01-09-email-verification-phish.png',
            imageAlt: 'Example of a phishing email',
            imageCaption: 'Example of a phishing email attempting to steal login credentials.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'The Psychology of Phishing'
                },
                {
                    type: 'p',
                    content: 'Phishing attacks are a form of social engineering, meaning they manipulate human psychology. They exploit emotions like fear, urgency, greed, and curiosity. An email saying "Your account will be suspended in 24 hours unless you click here!" is designed to make you panic and act without thinking.'
                },
                {
                    type: 'h4',
                    content: 'Real-World Scenario: The Fake Invoice'
                },
                {
                    type: 'p',
                    content: 'You receive an email with the subject "Overdue Invoice" from a company you don\'t recognize. The email contains an attached PDF and urges you to pay immediately to avoid late fees. The attacker is hoping you\'ll open the malicious attachment or click a link to a fake payment portal out of fear of having an unpaid bill.'
                }
            ],
            commonCharacteristics: [
                'Urgent or threatening language that creates a sense of panic.',
                'Generic greetings like "Dear Customer" instead of your name.',
                'Spoofed sender addresses that mimic legitimate companies.',
                'Requests for sensitive information like passwords, Social Security numbers, or credit card details.',
                'Suspicious attachments or links to fake websites.',
                'Poor spelling and grammar that legitimate organizations typically avoid.',
            ],
            keyPoint: {
                title: 'Did You Know?',
                text: "According to the FBI's Internet Crime Complaint Center, phishing was the most common type of cyber crime in 2022, with over 300,000 victims reporting losses exceeding $52 million."
            },
            protectionSteps: [
                'Never provide personal information in response to an unsolicited request.',
                "Verify the sender's email address carefully, not just the display name.",
                'Hover over links to see the actual URL before clicking.',
                'When in doubt, contact the company directly using official contact information found on their website, not from the email.',
                'Use multi-factor authentication (MFA) to add a critical layer of security to your accounts.',
            ]
        },
        quizzes: [
            {
                question: 'Which of these is most suspicious?',
                options: [
                    { text: 'An email from your boss with your name in the subject.', correct: false },
                    { text: 'An email from an unknown sender asking for your password.', correct: true },
                    { text: 'An email from HR about the upcoming company payroll.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! A legitimate service will never ask for your password via email.',
                    incorrect: 'Not quite. An unsolicited request for a password is a huge red flag.',
                },
            },
            {
                question: 'What is the primary goal of most phishing emails?',
                options: [
                    { text: 'To steal sensitive information like passwords or financial details.', correct: true },
                    { text: 'To provide you with important security updates from a trusted source.', correct: false },
                    { text: 'To sell you a legitimate product or service.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The main objective is to trick you into revealing information they can exploit.',
                    incorrect: 'Incorrect. Phishing is about theft, not legitimate business or security.',
                },
            }
        ]
    },
     {
        id: 'task2',
        title: 'Recognize Fake Websites',
        learningContent: {
            title: 'Identifying Fake Websites (Credential Harvesting)',
            description: 'Phishing emails often contain links to fake websites designed to look identical to legitimate ones, like a bank login page or a social media site. These sites, known as "credential harvesting" pages, are created solely to steal your username and password when you try to log in.',
            image: 'https://www.memcyco.com/wp-content/uploads/2024/09/image7.jpg',
            imageAlt: 'Example of a fake website',
            imageCaption: 'Fake websites often look nearly identical to legitimate ones to trick you.',
             additionalContent: [
                {
                    type: 'h4',
                    content: 'The HTTPS Myth'
                },
                {
                    type: 'p',
                    content: 'Many people believe that if a site has "HTTPS" and a padlock icon, it\'s safe. This is only partially true. HTTPS means the connection between your browser and the website is encrypted, which is good. However, it does NOT guarantee the website itself is legitimate. Scammers can easily get security certificates for their fake sites. The padlock just means your data is being sent securely... directly to the criminal.'
                },
                {
                    type: 'h4',
                    content: 'Pro Tip: Use a Password Manager'
                },
                {
                    type: 'p',
                    content: 'A password manager will only auto-fill your credentials on the exact, legitimate website URL it has saved. If you land on a fake site like "login-microsft.com", your password manager won\'t recognize it, which is a huge red flag that something is wrong.'
                }
            ],
            commonCharacteristics: [
                'Check the URL carefully: Look for misspellings (like "Paypa1"), unusual characters, or wrong domain extensions (.net instead of .com).',
                'Look for HTTPS: While not a guarantee of safety, a legitimate site will always use HTTPS for logins. A lack of it is a major warning.',
                'Examine the padlock icon: You can click on it to view security certificate details, though this is for advanced users.',
                'Poor design quality: Many fake sites have low-quality images, broken links, or layouts that feel "off".',
                'Suspicious content: Unexpected pop-ups, download prompts, or requests for unnecessary information are red flags.',
            ],
            keyPoint: {
                title: 'Typosquatting Alert',
                text: 'Cybercriminals often register domains with common misspellings of popular websites (like "gooogle.com" instead of "google.com") to trick users. This practice is called "typosquatting" or "URL hijacking."'
            },
            protectionSteps: [
                'Always check the URL in the address bar before entering any information.',
                'Look for the padlock icon indicating a secure connection, but do not rely on it as the only sign of safety.',
                "Verify the website's security certificate if you're unsure.",
                'Use a website reputation service or browser extension that warns of malicious sites.',
                'Bookmark important sites (like your bank) and always use your bookmark instead of clicking links in emails.',
            ]
        },
        quizzes: [
            {
                question: 'Which URL is most suspicious?',
                options: [
                    { text: 'http://paypa1.com/login', correct: true },
                    { text: 'https://paypal.com/login', correct: false },
                    { text: 'https://www.paypal.com', correct: false },
                ],
                feedback: {
                    correct: "Correct! The domain uses '1' instead of 'l' and lacks `https`.",
                    incorrect: 'Incorrect. Look closely at the spelling and the `http` vs `https`.',
                },
            },
            {
                question: 'What does "HTTPS" at the beginning of a URL indicate?',
                options: [
                    { text: 'The website is guaranteed to be 100% safe and legitimate.', correct: false },
                    { text: 'The connection between your browser and the website is encrypted.', correct: true },
                    { text: 'The website loads faster than one with just "HTTP".', correct: false },
                ],
                feedback: {
                    correct: 'Correct! HTTPS means the connection is secure and encrypted, but you still need to verify the domain itself is correct.',
                    incorrect: 'Incorrect. HTTPS is about encryption, not a guarantee of legitimacy or speed.',
                },
            }
        ]
    },
    {
        id: 'task3',
        title: 'Detect Suspicious Attachments',
        learningContent: {
            title: 'Dangerous Email Attachments & Malware',
            description: 'Email attachments are a primary method for delivering malware. Cybercriminals disguise malicious files as harmless documents like invoices, receipts, or resumes. Opening these files can install viruses, ransomware, or spyware on your device.',
            image: 'https://gorazy.com/blog/images/dhl-zip-file-malicious-spam.jpg',
            imageAlt: 'Example of a malicious email attachment',
            imageCaption: 'Malicious emails often disguise dangerous attachments as legitimate documents.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'The Threat of Malicious Macros'
                },
                {
                    type: 'p',
                    content: 'Microsoft Office documents (.docx, .xlsx) can contain "macros," which are small scripts to automate tasks. Attackers embed malicious macros that run when you open the file and enable content. They often include a lure like "This document is protected, please click \'Enable Editing\' or \'Enable Content\' to view." Doing so executes the malware.'
                },
                 {
                    type: 'h4',
                    content: 'Real-World Scenario: Fake Shipping Notification'
                },
                {
                    type: 'p',
                    content: 'You receive an email from a shipping company like DHL or FedEx saying a package is on its way. Attached is a .zip file supposedly containing the shipping label and tracking information. Unzipping the file and opening the contents infects your computer with ransomware, locking all your files until you pay a fee.'
                }
            ],
            commonCharacteristics: [
                'Executable files: .exe, .msi, .bat, .cmd, .scr are programs and extremely high-risk.',
                'Script files: .js, .vbs, .ps1 are scripts that can run malicious code.',
                'Compressed files: .zip, .rar can hide other dangerous file types inside them.',
                'Office documents with macros: .docm, .xlsm, .pptm are macro-enabled by default.',
                'Double file extensions: A file named "invoice.pdf.exe" is an executable, not a PDF. Windows may hide the last extension by default.'
            ],
            keyPoint: {
                title: 'Ransomware Threat',
                text: "Approximately 94% of malware is delivered via email, often through malicious attachments. Ransomware attacks frequently begin with an employee opening an infected attachment that encrypts the organization's data."
            },
            protectionSteps: [
                'Never open attachments from unknown or unexpected senders.',
                'Even with known senders, verify unexpected attachments through another method (like a text or phone call) before opening.',
                'Use antivirus software to scan all downloads and email attachments automatically.',
                'Keep your operating system and software updated to protect against known vulnerabilities.',
                'In Windows, enable "File name extensions" in File Explorer to see the true file type.'
            ]
        },
        quizzes: [
            {
                question: 'Which attachment is most dangerous to open from an unknown sender?',
                options: [
                    { text: 'invoice.pdf', correct: false },
                    { text: 'Update.exe', correct: true },
                    { text: 'report.docx', correct: false },
                ],
                feedback: {
                    correct: 'Correct! An `.exe` file is an executable program that can install malware.',
                    incorrect: 'Incorrect. While any file can be a risk, `.exe` files are programs and thus the most directly dangerous.',
                },
            },
            {
                question: 'You receive an unexpected .zip file from a coworker. What should you do?',
                options: [
                    { text: 'Open it immediately since you know the coworker.', correct: false },
                    { text: 'Contact the coworker via a different method (phone/chat) to verify they sent it.', correct: true },
                    { text: 'Reply to the email and ask if they sent it.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! Their email could be compromised. Verifying through another channel is the safest action.',
                    incorrect: "Incorrect. Replying to the email could mean you're communicating with the attacker. Always verify out-of-band.",
                },
            }
        ]
    },
    {
        id: 'task4',
        title: 'Check Email Grammar & Tone',
        learningContent: {
            title: 'Language Clues in Phishing Emails',
            description: 'Many phishing attempts originate from non-native English speakers or use automated translation tools, resulting in grammatical errors, awkward phrasing, and unusual tone. These language clues can be a strong indicator of a fraudulent message.',
            image: 'https://it.mercer.edu/images/phish_example.png',
            imageAlt: 'Phishing email with poor grammar',
            imageCaption: 'Phishing email showing poor grammar and spelling mistakes.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'Intentional Mistakes?'
                },
                {
                    type: 'p',
                    content: 'Some researchers believe that obvious spelling and grammar mistakes are sometimes intentional. Scammers use them as a filter. The logic is that a person who doesn\'t notice these errors is a less savvy target and more likely to fall for the entire scam. By filtering out more careful individuals, they can focus on more promising victims.'
                },
                 {
                    type: 'h4',
                    content: 'Tone Policing: Urgency and Authority'
                },
                {
                    type: 'p',
                    content: 'Pay close attention to the tone. Does the email sound like it\'s from a real person or company? Phishing emails often use an overly urgent, demanding, or even threatening tone. They might also try to impersonate an authority figure, like a CEO or government official, to intimidate you into complying with their request.'
                }
            ],
            commonCharacteristics: [
                'Spelling and grammar mistakes: Legitimate companies typically proofread their communications carefully.',
                'Unnatural phrasing: Awkward sentence structure or unusual word choices (e.g., "kindly do the needful").',
                'Overly formal or informal language: A tone that is inconsistent with the supposed sender\'s typical style.',
                'Urgent or threatening tone: Creates pressure to bypass your critical thinking and act quickly.',
                'Generic greetings: "Dear valued customer" instead of using your name is a common red flag.',
            ],
            keyPoint: {
                title: 'Psychological Manipulation',
                text: 'Phishers often use urgency, fear, or excitement to trigger emotional responses that override logical thinking. Messages about account suspension, unexpected prizes, or urgent requests from authority figures are designed to make you act without verifying.'
            },
            protectionSteps: []
        },
        quizzes: [
            {
                question: 'Which email message is most likely a phishing attempt?',
                options: [
                    { text: '"your account is suspend! click here imediatly to fix!!"', correct: true },
                    { text: '"Hi team, please find the attached weekly report."', correct: false },
                    { text: '"Your monthly statement is now available to view online."', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The poor grammar, spelling errors, and urgent tone are all huge red flags.',
                    incorrect: 'Incorrect. Professional communications are typically well-written.',
                },
            },
            {
                question: 'Why do attackers use an urgent tone like "Immediate Action Required"?',
                options: [
                    { text: 'To create panic and prevent you from thinking carefully.', correct: true },
                    { text: 'Because the information they are providing is genuinely time-sensitive.', correct: false },
                    { text: 'To make their email stand out in a crowded inbox.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The sense of urgency is a psychological trick to bypass your rational judgment.',
                    incorrect: "Incorrect. It's a tactic designed to make you act on emotion rather than logic.",
                },
            }
        ]
    },
    {
        id: 'task5',
        title: 'Verify Sender Information',
        learningContent: {
            title: 'Email Spoofing and Sender Verification',
            description: 'Cybercriminals often "spoof" email addresses to make messages appear to come from legitimate sources, like your boss or your bank. Learning to verify the true sender information is a crucial skill for identifying phishing attempts.',
            image: 'https://esilo.com/wp-content/uploads/media-library/How-to-Check-Email-Headers-in-Gmail-for-Suspected-Phishing-e1624550260861.jpg',
            imageAlt: 'How to view email headers',
            imageCaption: 'Examining email headers can reveal the true, underlying sender information.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'Display Name vs. Real Address'
                },
                {
                    type: 'p',
                    content: 'The most common trick is to change the "Display Name". The email might say it\'s from "PayPal Support", but when you hover over or click on the name, the actual email address is revealed to be something like "user123@suspicious-domain.com". Always check the full email address.'
                },
                {
                    type: 'h4',
                    content: 'Pro Tip: View Email Headers'
                },
                {
                    type: 'p',
                    content: 'For advanced inspection, you can view the "original" message or "headers". In Gmail, click the three dots next to the reply button and select "Show original". This shows the technical details of the email\'s path through the internet and can reveal the true origin server, even if the "From" address is forged.'
                }
            ],
            commonCharacteristics: [
                'Check the email address, not just the display name: Display names are very easily faked.',
                'Look for slight misspellings in the domain name: "amaz0n.com" instead of "amazon.com".',
                'Examine the reply-to address: Sometimes the "From" address is spoofed, but the "Reply-To" is a different, attacker-controlled address.',
                'Be wary of subdomains: An email from "support.microsoft.com" is legitimate, but an email from "microsoft.support-team.com" is fake. The true domain is the last part before the .com/.net/etc.',
                'Be wary of free email services: Legitimate businesses will not use @gmail.com or @yahoo.com for official communications.',
            ],
            keyPoint: {
                title: 'Domain Spoofing Techniques',
                text: "Attackers use various techniques to create deceptive domains:\n- Homograph attacks: Using similar-looking characters from different alphabets (e.g., the Cyrillic 'а' instead of the Latin 'a').\n- Subdomain deception: \"microsoft.security-alert.com\" appears legitimate at first glance, but the real domain is \"security-alert.com\".\n- Top-level domain variations: \"amazon.co\" instead of \"amazon.com\""
            },
            protectionSteps: []
        },
        quizzes: [
            {
                question: 'Which sender email address is the fake one?',
                options: [
                    { text: 'support@microsoft-security.com', correct: true },
                    { text: 'support@microsoft.com', correct: false },
                    { text: 'noreply@email.microsoft.com', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The official domain is `microsoft.com`. Scammers create similar-looking domains to trick you.',
                    incorrect: 'Incorrect. The key is the main domain. `microsoft-security.com` is not owned by Microsoft.',
                },
            },
            {
                question: 'An email\'s display name is "Your Boss", but the address is "user123@gmail.com". What should you conclude?',
                options: [
                    { text: 'Your boss is probably sending from their personal account.', correct: false },
                    { text: "It's safe because the display name looks correct.", correct: false },
                    { text: 'This is highly suspicious and likely a phishing attempt.', correct: true },
                ],
                feedback: {
                    correct: "Correct! The display name is easily faked. The email address is the real clue, and it's unlikely your boss would use a generic personal email for official business.",
                    incorrect: 'Incorrect. Always trust the email address, not the display name.',
                },
            }
        ]
    },
    {
        id: 'task6',
        title: 'The Link Hover Test',
        learningContent: {
            title: 'Inspecting Links Before Clicking',
            description: 'The text of a link can say anything, but the destination URL can be completely different. A link might say "Click here for your bank," but it could actually lead to a malicious site. Always inspect links before clicking.',
            image: 'https://blog.lmttech.com/hubfs/Hover%20Over%20Link%20in%20Email.png',
            imageAlt: 'How to hover over links',
            imageCaption: 'On a desktop, hover your mouse over a link to see the actual destination URL in the bottom corner of your browser.',
            additionalContent: [
                 {
                    type: 'h4',
                    content: 'URL Shorteners: A Hidden Danger'
                },
                {
                    type: 'p',
                    content: 'Services like bit.ly or tinyurl.com shorten long URLs, but they also hide the true destination. Attackers use them to disguise malicious links. Be extra cautious with shortened URLs, especially from untrusted sources. You can use a URL expander tool to check the final destination before clicking.'
                }
            ],
            commonCharacteristics: [
                'Hover before clicking: On desktop, hover your mouse over the link to see the real URL.',
                'Long-press on mobile: On a phone or tablet, press and hold the link to see a preview of the URL before opening it.',
                'Check for HTTPS: Ensure the URL begins with "https://" for secure connections.',
                'Examine the domain name: Look for misspellings or unusual characters. The true domain is the word that comes right before ".com", ".net", etc.',
            ],
            keyPoint: {
                title: 'URL Deconstruction',
                text: 'Understanding URL structure helps identify fakes. In "https://paypal.login-security.com", the true domain is "login-security.com", not "paypal.com". "paypal" is just a subdomain designed to trick you.'
            },
            protectionSteps: [
                'On mobile devices, long-press on the link to see the URL before opening.',
                'Use official apps or your own bookmarks instead of clicking links in emails.',
                'When in doubt, manually type the website address into your browser.',
            ]
        },
        quizzes: [
            {
                question: 'A link says "google.com", but hovering shows "http://g00gle.account-update.com". Is it safe?',
                options: [
                    { text: "Yes, the text says it's Google.", correct: false },
                    { text: 'No, the actual URL is different and suspicious.', correct: true },
                    { text: "It's probably just a redirect.", correct: false },
                ],
                feedback: {
                    correct: 'Correct! The actual URL is the only thing that matters, and this one is clearly not the real Google.',
                    incorrect: 'Incorrect. Always trust the hover URL, not the displayed text.',
                },
            },
            {
                question: 'In the URL "https://yourbank.com.secure.login.net/signin", what is the true domain?',
                options: [
                    { text: 'yourbank.com', correct: false },
                    { text: 'login.net', correct: true },
                    { text: 'secure.login.net', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The true domain is the part just before the `.com`, `.net`, etc. The rest are subdomains designed to confuse you.',
                    incorrect: 'Incorrect. Attackers use subdomains to make a URL look legitimate. The real domain is at the very end.',
                },
            }
        ]
    },
    {
        id: 'task7',
        title: 'Social Media Scams',
        learningContent: {
            title: 'Social Media Phishing Threats',
            description: 'Social media platforms are a prime target for phishing attacks. Scammers use fake profiles, malicious links, and deceptive messages to trick users into revealing sensitive information or sending money.',
            image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            imageAlt: 'Social media phishing examples',
            imageCaption: 'Social media platforms are increasingly targeted by phishers.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'Real-World Scenario: The Friend-in-Need Scam'
                },
                {
                    type: 'p',
                    content: 'A scammer clones your friend\'s profile and sends you a message saying they\'re in trouble and need you to send them money urgently for an emergency. Because the message seems to come from a trusted friend, victims are often tricked into sending money before they realize it\'s a scam.'
                }
            ],
            commonCharacteristics: [
                'Fake giveaway offers: "You\'ve won a prize! Click here to claim it."',
                'Profile cloning: Scammers create copies of your friends\' profiles to trick you.',
                'Malicious ads: Ads promoting fake products or services that steal your payment info.',
                'Fake customer support: Impersonating company support accounts to get your login details.',
                'Quiz scams: "Which celebrity do you look like?" quizzes that harvest your personal data.',
            ],
            keyPoint: {
                title: 'Profile Cloning',
                text: "In profile cloning attacks, scammers copy profile pictures and information from legitimate accounts to create convincing fakes. They then send friend requests to the original account's contacts, often followed by messages requesting money or personal information."
            },
            protectionSteps: [
                'Adjust your privacy settings to limit who can see your information.',
                'Be cautious of unsolicited messages, even if they appear to be from friends.',
                'Verify unusual requests through another communication channel (like a phone call).',
                "Don't overshare personal information that could be used in targeted attacks.",
                'Use a different, strong password for each social media account.',
            ]
        },
        quizzes: [
            {
                question: 'Which social media message is most likely a scam?',
                options: [
                    { text: 'A message from a verified friend about weekend plans.', correct: false },
                    { text: 'A message from a stranger saying you won a prize and need to pay a fee to claim it.', correct: true },
                    { text: 'A comment on one of your public posts.', correct: false },
                ],
                feedback: {
                    correct: "Correct! This is a classic advance-fee scam. Legitimate prizes don't require payment.",
                    incorrect: 'Incorrect. Unsolicited messages about winning money are almost always scams.',
                },
            },
            {
                question: "You get a friend request from someone you're already friends with. The new profile has very few photos or friends. What is this?",
                options: [
                    { text: 'A cloned account, likely made by a scammer to trick you and your friends.', correct: true },
                    { text: 'Your friend probably just made a new account and forgot to add everyone.', correct: false },
                    { text: 'A temporary bug in the social media platform.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! This is a common tactic called profile cloning. The scammer will likely send messages asking for money or links to viruses.',
                    incorrect: "Incorrect. While possible, the most likely scenario is that it's a scam attempt.",
                },
            }
        ]
    },
    {
        id: 'task8',
        title: 'Spear Phishing',
        learningContent: {
            title: 'Targeted Spear Phishing Attacks',
            description: 'Spear phishing is a highly targeted and dangerous form of phishing. Unlike generic phishing that is sent to millions, spear phishing attackers research specific individuals or organizations to create personalized, convincing messages that are much harder to detect.',
            image: 'https://firewalltimes.com/wp-content/uploads/2020/09/image-8.png',
            imageAlt: 'Spear phishing example',
            imageCaption: 'Spear phishing emails are personalized and often reference real colleagues or projects.',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'How They Get Your Information'
                },
                {
                    type: 'p',
                    content: 'Attackers gather personal information from public sources like your social media profiles (LinkedIn, Facebook), your company\'s website, and news articles. They use this information to make their emails highly believable.'
                }
            ],
            commonCharacteristics: [
                'Personalized content: Uses your name, job title, or other specific details.',
                'Apparent legitimacy: Appears to come from someone you know or trust, like your boss or a colleague.',
                'Research-based: References real projects, events, or people in your company.',
                'Higher quality: Usually has perfect grammar and professional design.',
                'Specific goals: Often aims to steal sensitive corporate data or trick you into making fraudulent wire transfers.',
            ],
            keyPoint: {
                title: 'Whaling Attacks',
                text: '"Whaling" is a type of spear phishing that specifically targets high-level executives (the "big fish" or "whales"). These attacks are extremely sophisticated and may involve extensive research to create convincing messages that appear to come from other executives or trusted partners.'
            },
            protectionSteps: [
                'Be skeptical of unexpected or unusual requests, even if they appear to come from known contacts.',
                'Verbally verify high-stakes requests (like wiring money or sharing sensitive data) through a separate communication channel.',
                'Limit the amount of personal information you share publicly online.',
                'Implement multi-factor authentication for all sensitive accounts.',
            ]
        },
        quizzes: [
            {
                question: 'Which email is the best example of spear phishing?',
                options: [
                    { text: 'An email from your "boss", referencing a project you\'re on, asking you to wire money.', correct: true },
                    { text: 'A generic newsletter you subscribed to.', correct: false },
                    { text: 'A mass email announcing a 20% off sale.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! This is highly personalized and asks for a high-risk action.',
                    incorrect: 'Incorrect. Spear phishing is defined by its personalization.',
                },
            },
            {
                question: 'Why is spear phishing often more dangerous than regular phishing?',
                options: [
                    { text: 'It always contains a virus in the attachment.', correct: false },
                    { text: 'The personalization makes it harder to spot and more believable.', correct: true },
                    { text: 'It can only be done by highly advanced government hackers.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! Because it uses details specific to you, it bypasses the "this seems generic" red flag, making it much more effective.',
                    incorrect: 'Incorrect. Its danger comes from its believability due to personalization.',
                },
            }
        ]
    },
    {
        id: 'task9',
        title: 'Phone & SMS Phishing (Vishing/Smishing)',
        learningContent: {
            title: 'Voice and SMS Phishing',
            description: 'Phishing isn\'t limited to email. "Vishing" (voice phishing) uses phone calls, and "Smishing" (SMS phishing) uses text messages to trick victims into revealing sensitive information.',
            image: 'https://timely-benefit-e63d540317.media.strapiapp.com/Picture_1_Phishing_vs_Vishing_vs_Smishing_Key_Differences_a2c88f0733.jpg',
            imageAlt: 'Vishing and smishing examples',
            imageCaption: 'Phone-based phishing attempts are becoming increasingly common.',
             additionalContent: [
                {
                    type: 'h4',
                    content: 'The Rise of AI Voice Scams'
                },
                {
                    type: 'p',
                    content: 'Scammers are now using AI to clone voices. They can take a small sample of a person\'s voice from a social media video and create a realistic audio clip. This can be used in vishing scams where they call you pretending to be a family member in distress.'
                }
            ],
            commonCharacteristics: [
                'Impersonation: Posing as banks, government agencies (like the IRS), or tech support.',
                'Urgent requests: Claiming your account is compromised and immediate action is needed.',
                'Fake verification: Asking you to "verify" account details or passwords over the phone.',
                'Prize scams: Sending a text notifying you of a prize you\'ve won with a link to claim it.',
                'Two-factor authentication bypass: Tricking you into reading them the verification code that was just sent to your phone.',
            ],
            keyPoint: {
                title: 'Caller ID Spoofing',
                text: 'Vishers often spoof their Caller ID information to make calls appear to come from legitimate organizations. They can make it look like the call is coming from your bank\'s official number, making the scam more convincing. Never trust Caller ID alone.'
            },
            protectionSteps: [
                'Be skeptical of unsolicited calls or texts, even if the Caller ID looks legitimate.',
                'Never provide sensitive information over the phone unless you initiated the call to a verified number.',
                'If you receive a suspicious call, hang up and call the organization back using an official number from their website.',
                'Do not click links in suspicious text messages; delete them immediately.',
            ]
        },
        quizzes: [
            {
                question: 'Which is an example of smishing?',
                options: [
                    { text: 'A phone call from your bank asking to verify a recent purchase.', correct: false },
                    { text: 'A text saying "Your package delivery failed. Click here: [suspicious link]".', correct: true },
                    { text: "A confirmation text for a doctor's appointment.", correct: false },
                ],
                feedback: {
                    correct: 'Correct! Unsolicited texts with strange links are a very common form of smishing.',
                    incorrect: 'Incorrect. Smishing refers specifically to phishing via SMS (text message).',
                },
            },
            {
                question: 'You get an automated call saying your Social Security Number has been compromised and you must press 1 to speak to an agent. This is likely:',
                options: [
                    { text: 'A vishing (voice phishing) scam to try and steal your personal information.', correct: true },
                    { text: 'A legitimate call from the Social Security Administration.', correct: false },
                    { text: 'A wrong number.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! Government agencies will not contact you with threatening automated calls. This is a common vishing tactic.',
                    incorrect: 'Incorrect. This is a well-known phone scam. Government agencies typically communicate via official mail.',
                },
            }
        ]
    },
    {
        id: 'task10',
        title: 'Reporting & Prevention',
        learningContent: {
            title: 'Reporting Phishing and Proactive Prevention',
            description: 'Reporting phishing attempts is crucial for protecting yourself and others. Your reports help security companies, email providers, and law enforcement identify new threats and improve their defensive filters.',
            image: 'https://infosec.ucf.edu/wp-content/uploads/sites/2/2019/08/pabv2-outlook-desktop-1.jpg',
            imageAlt: 'Reporting phishing attempts',
            imageCaption: 'Most email clients have a built-in "Report Phishing" button. Use it!',
            additionalContent: [
                {
                    type: 'h4',
                    content: 'What Happens When You Report?'
                },
                {
                    type: 'p',
                    content: 'When you report a phishing email, the information is fed into automated systems. These systems analyze the email\'s content, links, and headers to identify patterns. If enough people report similar emails, filters can be updated globally within minutes or hours to block that attack for everyone else.'
                }
            ],
            commonCharacteristics: [
                'In your email client: Use the built-in "Report Phishing" or "Report Spam" button.',
                'Forward the email: The Anti-Phishing Working Group accepts reports at reportphishing@apwg.org.',
                'For government agencies: You can report fraud to the Federal Trade Commission (FTC) at reportfraud.ftc.gov.',
                'For financial institutions: Forward bank-related phishing attempts to your bank\'s fraud department.',
            ],
            keyPoint: {
                title: 'Why Reporting Matters',
                text: 'When you report phishing attempts, you\'re contributing to a collective defense system. Security companies analyze reported phishing messages to identify new tactics, update filters, and sometimes even track down and disrupt the criminals\' operations. You are helping to protect the entire community.'
            },
            protectionSteps: [
                'Use comprehensive security software with anti-phishing protection.',
                'Keep your operating system, browser, and other software updated to patch security vulnerabilities.',
                'Enable multi-factor authentication on all important accounts. This is one of the most effective defenses.',
                'Regularly back up important data to an external drive or cloud service to mitigate the damage of a ransomware attack.',
            ]
        },
        quizzes: [
            {
                question: 'What is the correct action if you receive a phishing email?',
                options: [
                    { text: 'Click the link to see what happens.', correct: false },
                    { text: 'Reply asking them to stop.', correct: false },
                    { text: 'Report it as phishing/spam and then delete it.', correct: true },
                ],
                feedback: {
                    correct: 'Correct! Never interact. The safest and most helpful action is to report then delete.',
                    incorrect: 'Incorrect. Interacting in any way can confirm your email is active to attackers.',
                },
            },
            {
                question: 'Why is it important to report phishing attempts?',
                options: [
                    { text: 'It helps train filters to block similar messages for you and others in the future.', correct: true },
                    { text: 'It immediately traces the scammer and alerts the police.', correct: false },
                    { text: 'It adds your name to a "do not phish" list.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! Your report is valuable data that helps email providers and security companies recognize and block new threats.',
                    incorrect: 'Incorrect. While it may contribute to larger investigations, the immediate benefit is improving automated security filters.',
                },
            }
        ]
    },
    {
        id: 'task11',
        title: 'The Golden Rule of Cybersecurity',
        learningContent: {
            title: 'The Human Firewall: Your Best Defense',
            description: 'Ultimately, the most effective defense against phishing is you. Technology like spam filters and antivirus provides important safeguards, but determined attackers can bypass them. Your vigilance, skepticism, and knowledge are the final and most critical line of defense.',
            image: 'https://fastercapital.com/i/And-Sinker--Protecting-Yourself-from-Phishing-Scams-and-Fraud--Staying-Informed-and-Up-to-Date-on-Phishing-Scams.webp',
            imageAlt: 'Cybersecurity awareness',
            imageCaption: 'Staying informed and vigilant is your best defense against phishing.',
             additionalContent: [
                {
                    type: 'h4',
                    content: 'Adopting a "Zero Trust" Mindset'
                },
                {
                    type: 'p',
                    content: 'In cybersecurity, "Zero Trust" is a model based on the principle of "never trust, always verify." Apply this to your digital life. Don\'t automatically trust an email just because it appears to be from a known source. Always verify unexpected or unusual requests, especially those involving money, credentials, or sensitive data.'
                },
                {
                    type: 'h4',
                    content: 'Recap: Your Anti-Phishing Checklist'
                },
                {
                    type: 'ul',
                    content: [
                        'Is the sender\'s email address legitimate?',
                        'Is the tone urgent or threatening?',
                        'Are there spelling or grammar mistakes?',
                        'Does the link URL match the text and go to a trusted domain?',
                        'Is it asking for sensitive information?',
                        'Was I expecting this email or attachment?'
                    ]
                }
            ],
            commonCharacteristics: [
                'Think before you click: Always pause and verify before interacting with links or attachments.',
                'Verify unusual requests: Confirm unexpected requests through a separate, trusted communication channel (e.g., phone call, official app).',
                'Stay informed: Keep up with the latest phishing techniques and common scams.',
                'Use strong, unique passwords and Multi-Factor Authentication (MFA): This is your best technical defense if your credentials are ever stolen.',
                'Trust your instincts: If something feels wrong or too good to be true, it probably is.',
            ],
            keyPoint: {
                title: 'Continuous Learning',
                text: 'Phishing tactics constantly evolve, so ongoing education is essential. Regular security awareness training can reduce successful phishing attacks by up to 70% according to recent studies. What you\'ve learned here is the first step.'
            },
            protectionSteps: [
                'Make security part of your daily routine, not an afterthought.',
                'Share your knowledge with friends, family, and colleagues to help protect them too.',
                'Participate in any security awareness programs offered by your school or employer.',
                'Stay curious about new technologies and their potential security implications.',
                'Remember that everyone can make a mistake. The important thing is to report it immediately and learn from it.',
            ]
        },
        quizzes: [
            {
                question: 'What is the single most important mindset for defending against phishing?',
                options: [
                    { text: 'Responding to every email as quickly as possible.', correct: false },
                    { text: 'Trusting any email that uses my name or personal details.', correct: false },
                    { text: 'Maintaining a healthy skepticism and verifying requests before acting.', correct: true },
                ],
                feedback: {
                    correct: 'Exactly! The core of cybersecurity is to "trust, but verify."',
                    incorrect: 'Not quite. Speed and personalization are tools that attackers use against you.',
                },
            },
            {
                question: 'When in doubt about a message or link, what is the best thing to do?',
                options: [
                    { text: 'Click it to see if your antivirus catches anything.', correct: false },
                    { text: 'Don\'t click it. Delete the message or find the official website yourself via a search engine.', correct: true },
                    { text: 'Forward it to a friend to see what they think.', correct: false },
                ],
                feedback: {
                    correct: 'Correct! The safest action is no action. Never click a suspicious link. Always navigate to sites directly.',
                    incorrect: 'Incorrect. Never "test" a suspicious link, and don\'t spread potential phishing by forwarding it.',
                },
            }
        ]
    }
];

const totalQuestions = tasksData.reduce((acc, task) => acc + task.quizzes.length, 0);

const CustomAlert = ({ title, message, onClose, show }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg text-center w-11/12 max-w-md shadow-lg border-t-4 border-blue-500">
                <h3 className="text-2xl font-bold text-blue-500 mb-4">{title}</h3>
                <p className="mb-6 text-lg">{message}</p>
                <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};

const PhishingAwareness = () => {
    const [score, setScore] = useState(0);
    const [answeredQuizzes, setAnsweredQuizzes] = useState(new Set());
    const [unlockedTasks, setUnlockedTasks] = useState(new Set(['task1']));
    const [activeTask, setActiveTask] = useState('task1');
    const [alert, setAlert] = useState({ show: false, title: '', message: '' });
    const [feedback, setFeedback] = useState({});

    const saveStateToLocalStorage = useCallback(() => {
        try {
            localStorage.setItem('aware_score', score.toString());
            localStorage.setItem('aware_answered', JSON.stringify(Array.from(answeredQuizzes)));
            localStorage.setItem('aware_unlocked', JSON.stringify(Array.from(unlockedTasks)));
        } catch (error) {
            console.error("Failed to save state to localStorage:", error);
        }
    }, [score, answeredQuizzes, unlockedTasks]);

    useEffect(() => {
        try {
            const savedScore = localStorage.getItem('aware_score');
            const savedAnswered = localStorage.getItem('aware_answered');
            const savedUnlocked = localStorage.getItem('aware_unlocked');

            setScore(savedScore ? parseInt(savedScore, 10) : 0);
            setAnsweredQuizzes(savedAnswered ? new Set(JSON.parse(savedAnswered)) : new Set());
            setUnlockedTasks(savedUnlocked && JSON.parse(savedUnlocked).length > 0 ? new Set(JSON.parse(savedUnlocked)) : new Set(['task1']));
        } catch (error) {
            console.error("Failed to load state from localStorage:", error);
        }
    }, []);

    useEffect(() => {
        saveStateToLocalStorage();
    }, [saveStateToLocalStorage]);

    const handleTaskHeaderClick = (taskId) => {
        if (!unlockedTasks.has(taskId)) {
            setAlert({ show: true, title: 'Task Locked!', message: 'You must complete the previous tasks to unlock this one.' });
        } else {
            setActiveTask(activeTask === taskId ? null : taskId);
        }
    };
    
    const handleOptionClick = (taskId, quizIndex, option, optionIndex) => {
        const quizId = `${taskId}_${quizIndex}`;
        if (answeredQuizzes.has(quizId)) return;

        const task = tasksData.find(t => t.id === taskId);
        const quiz = task.quizzes[quizIndex];

        if (option.correct) {
            const newScore = score + 1;
            setScore(newScore);
            const newAnsweredQuizzes = new Set(answeredQuizzes).add(quizId);
            setAnsweredQuizzes(newAnsweredQuizzes);

            setFeedback({
                ...feedback,
                [quizId]: { correct: true, text: quiz.feedback.correct }
            });
        } else {
            setFeedback({
                ...feedback,
                [quizId]: {
                    correct: false,
                    text: quiz.feedback.incorrect,
                    selectedOptionIndex: optionIndex
                }
            });
        }
    };
    
    const handleNextButtonClick = (currentTaskId) => {
        const currentIndex = tasksData.findIndex(task => task.id === currentTaskId);
        const nextTask = tasksData[currentIndex + 1];

        setActiveTask(null);

        if (nextTask) {
            setUnlockedTasks(prev => new Set(prev).add(nextTask.id));
            setActiveTask(nextTask.id);
        } else {
            setAlert({ show: true, title: 'Congratulations!', message: `You've completed the Phishing Awareness course. Your final score is ${score}/${totalQuestions}. Keep an eye out for phishing attempts!` });
        }
    };

    const handleReset = () => {
        localStorage.removeItem('aware_score');
        localStorage.removeItem('aware_answered');
        localStorage.removeItem('aware_unlocked');
        setScore(0);
        setAnsweredQuizzes(new Set());
        setUnlockedTasks(new Set(['task1']));
        setActiveTask('task1');
        setFeedback({});
    };

    const percentage = totalQuestions > 0 ? (answeredQuizzes.size / totalQuestions) * 100 : 0;
    
    return (
        <div className="bg-gray-50 text-gray-800 font-sans p-5 min-h-screen">
            <CustomAlert {...alert} onClose={() => setAlert({ ...alert, show: false })} />
            <div className="max-w-7xl mx-auto">
                <header className="bg-white p-5 text-center border-2 border-gray-300 rounded-lg shadow-sm mb-5">
                    <h1 className="text-4xl font-bold">Phishing Awareness</h1>
                </header>

                <div className="bg-white p-5 rounded-lg border-2 border-gray-300 shadow-sm mb-5">
                    <h2 className="text-3xl font-bold mb-4">Your Progress</h2>
                    <div className="flex flex-wrap gap-5 mb-5">
                        <div className="flex-1 text-center bg-gray-100 p-5 rounded-lg border border-gray-200 min-w-[200px]">
                            <h3 className="text-4xl font-bold text-gray-600">{score}</h3>
                            <p>Correct Answers</p>
                        </div>
                        <div className="flex-1 text-center bg-gray-100 p-5 rounded-lg border border-gray-200 min-w-[200px]">
                            <h3 className="text-4xl font-bold text-gray-600">{totalQuestions}</h3>
                            <p>Total Questions</p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 border border-gray-300">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <button onClick={handleReset} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        Reset Progress <i className="fas fa-rotate-left ml-2"></i>
                    </button>
                </div>

                <div className="space-y-5">
                    {tasksData.map((task, taskIndex) => {
                         const isUnlocked = unlockedTasks.has(task.id);
                         const isTaskActive = activeTask === task.id;
                         const answeredInTaskCount = task.quizzes.filter((_, quizIndex) => answeredQuizzes.has(`${task.id}_${quizIndex}`)).length;
                         const isTaskComplete = answeredInTaskCount === task.quizzes.length;

                        return (
                            <div key={task.id} className="bg-white rounded-lg border-2 border-gray-300 shadow-sm overflow-hidden">
                                <div className="p-5 flex justify-between items-center cursor-pointer" onClick={() => handleTaskHeaderClick(task.id)}>
                                    <span className="font-bold text-xl">{task.title}</span>
                                    <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${isUnlocked ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {isUnlocked ? 'Unlocked' : 'Locked'}
                                    </span>
                                </div>
                                {isTaskActive && (
                                    <div className="p-5 border-t border-gray-200">
                                        <div className="prose max-w-none">
                                           <h3 className="text-blue-600">{task.learningContent.title}</h3>
                                            <p>{task.learningContent.description}</p>
                                            {task.learningContent.image && (
                                                <div className="text-center my-4">
                                                    <img src={task.learningContent.image} alt={task.learningContent.imageAlt} className="max-w-full h-auto border-4 border-gray-200 rounded p-1 inline-block" />
                                                    <p className="text-sm italic text-gray-600 mt-2">{task.learningContent.imageCaption}</p>
                                                </div>
                                            )}

                                            {task.learningContent.additionalContent?.map((item, index) => {
                                                if (item.type === 'h4') return <h4 key={index}>{item.content}</h4>;
                                                if (item.type === 'p') return <p key={index}>{item.content}</p>;
                                                if (item.type === 'ul') return <ul key={index}>{item.content.map((li, i) => <li key={i}>{li}</li>)}</ul>;
                                                return null;
                                            })}

                                            <h4>Common Characteristics:</h4>
                                            <ul>
                                                {task.learningContent.commonCharacteristics.map((char, i) => <li key={i}>{char}</li>)}
                                            </ul>
                                            {task.learningContent.keyPoint && (
                                                <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500 my-4">
                                                    <h4>{task.learningContent.keyPoint.title}</h4>
                                                    <p>{task.learningContent.keyPoint.text}</p>
                                                </div>
                                            )}
                                            {task.learningContent.protectionSteps.length > 0 && (
                                              <>
                                                <h4>How to Protect Yourself:</h4>
                                                <ol>
                                                    {task.learningContent.protectionSteps.map((step, i) => <li key={i}>{step}</li>)}
                                                </ol>
                                              </>
                                            )}
                                        </div>
                                        
                                        {task.quizzes.map((quiz, quizIndex) => {
                                            const quizId = `${task.id}_${quizIndex}`;
                                            const isAnswered = answeredQuizzes.has(quizId);
                                            const feedbackState = feedback[quizId];
                                            
                                            return (
                                                <div key={quizIndex} className="my-5">
                                                    <p className="font-bold text-lg mb-3">{quiz.question}</p>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {quiz.options.map((option, optionIndex) => {
                                                             let optionClass = "p-4 border-2 rounded-lg cursor-pointer transition-colors";
                                                             
                                                            if (isAnswered) {
                                                                if(option.correct) {
                                                                    optionClass += " bg-green-500 border-green-600 text-white cursor-not-allowed";
                                                                } else {
                                                                    optionClass += " bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed";
                                                                }
                                                            } else if (feedbackState && !feedbackState.correct && feedbackState.selectedOptionIndex === optionIndex) {
                                                                optionClass += " bg-red-500 border-red-600 text-white";
                                                            } else {
                                                                optionClass += " bg-white border-gray-300 hover:bg-gray-100 hover:border-blue-500";
                                                            }

                                                            return(
                                                            <div 
                                                                key={optionIndex}
                                                                className={optionClass}
                                                                onClick={() => handleOptionClick(task.id, quizIndex, option, optionIndex)}
                                                            >
                                                                {option.text}
                                                            </div>
                                                        )})}
                                                    </div>
                                                    {feedback[quizId] && (
                                                        <div className={`mt-4 p-3 rounded-lg border-l-4 ${feedback[quizId].correct ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
                                                            {feedback[quizId].text}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                        <button 
                                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={!isTaskComplete}
                                            onClick={() => handleNextButtonClick(task.id)}
                                        >
                                            {taskIndex === tasksData.length - 1 ? 'Finish' : 'Next Task'} <i className={`fas ${taskIndex === tasksData.length - 1 ? 'fa-flag-checkered' : 'fa-arrow-right'} ml-2`}></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default PhishingAwareness;

