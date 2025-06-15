/**
 * Email template for user verification
 *
 * This template is used to create a HTML email for account verification.
 * It contains a verification link for the user to click on.
 *
 * @param {string} link - The verification link that the user should click
 * @returns {string} The HTML email content
 */
export const generateVerificationEmail = (link: string): string => {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your Email</title>
  <style type="text/css">
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width: 600px) {
      table[class="responsive-table"] {
        width: 100% !important;
      }
      td[class="mobile-center"] {
        text-align: center !important;
      }
      td[class="mobile-padding"] {
        padding: 10px !important;
      }
      img[class="mobile-img"] {
        width: 100% !important;
        height: auto !important;
      }
      h1 {
        font-size: 28px !important;
        line-height: 36px !important;
      }
    }
  </style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
  <!-- HIDDEN PREHEADER TEXT -->
  <div style="display: none; font-size: 1px; color: #f4f4f4; line-height: 1px; font-family: 'Helvetica', Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Confirm your email to get started.
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
      <td bgcolor="#FFA73B" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="responsive-table">
          <tr>
            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
              <a href="{{company_url}}" target="_blank">
                <img alt="Logo" src="{{logo_url}}" width="100" height="100" style="display: block; font-family: 'Helvetica', Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0" class="mobile-img">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- HERO -->
    <tr>
      <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="responsive-table" style="background-color: #ffffff; border-radius: 4px 4px 0 0;">
          <tr>
            <td align="center" valign="top" style="padding: 40px 20px 20px 20px;">
              <h1 style="font-family: 'Helvetica', Arial, sans-serif; font-size: 48px; font-weight: 400; margin: 0;">Welcome!</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="responsive-table" style="background-color: #ffffff;">
          <tr>
            <td align="left" class="mobile-padding" style="padding: 20px 30px 40px 30px; font-family: 'Helvetica', Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your email address. Just press the button below.</p>
            </td>
          </tr>
          <!-- BUTTON -->
          <tr>
            <td align="center" class="mobile-padding" style="padding: 0 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${link}" target="_blank" style="font-size: 20px; font-family: 'Helvetica', Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 3px; display: inline-block;">Verify Email</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- SUPPORT -->
          <tr>
            <td align="left" class="mobile-padding" style="padding: 0 30px 20px 30px; font-family: 'Helvetica', Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="${link}" target="_blank" style="color: #FFA73B;">Please Right click on this link and copy it!</a></p>
            </td>
          </tr>
          <!-- FOOTER -->
          <tr>
            <td align="center" class="mobile-padding" style="padding: 30px 30px 30px 30px; font-family: 'Helvetica', Arial, sans-serif; font-size: 12px; line-height: 18px; color: #666666;">
              <p style="margin: 0;">If you didn't create an account, no further action is required.</p>
              <p style="margin: 0;">©2025 Ebookchi. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
