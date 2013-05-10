<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Page Not Found :(</title>
        <style>
            body {
                font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
                font-weight: 300;
                line-height: 1.5;
                padding: 1em;
            }
            h1 {
                color: #666;
                margin-top: 0;
            }
            h1 span {
                color: #999;
                font-weight: normal;
            }
            .container {
                margin: 0 auto;
                max-width: 800px;
                padding: 20px;
            }
            img {
                margin: 2em 0 0;
                width: 160px;
            }
            .message {
                background-color: #f5f5f5;
                border: 1px solid #ddd;
                padding: 3em;
            }
            a {
                color: #0059B2;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message" id="post_form_message">
                <?php
                
                $errorMessageToShow = '<h1>Problem sending message... <span>:(</span></h1><p>Uh oh. Something went wrong when we tried to send your message.</p><p>Please try emailing <a href="mailto:info@experiencebureau.com">info@experiencebureau.com</a>.</p>';

                // Mail of sender
                $mail_from = "$contact_email";
                // From 
                $header = "from: " . $contact_name . "<" . $mail_from . ">";
                // Subject
                $subject = "Message from Experience Bureau website";
                // Message
                $message = "From: " . $contact_name . "\r \nReply to: " . $mail_from . "\r \nMessage:\r \n" . $contact_message . "\r \n ";

                $to ='info@experiencebureau.com';

                if(trim($contact_name)!='' && trim($mail_from)!='' && trim($contact_message)!='') {
                    $send_contact=mail($to,$subject,$message,$header);
                    if($send_contact){
                        echo "<p>Thanks for sending the message. All the best.</p>";
                        echo '<p><a href="http://www.experiencebureau.com">< Go back to the Experience Bureau website</a>.</p>';
                    }
                    else {
                        echo $errorMessageToShow;
                    }
                } else {
                    echo $errorMessageToShow;
                }
                
                ?>
            </div>
        </div>
    </body>
</html>
