'use client'

export default function PrivacyPage() {
  return (
    <div className="privacy-page">

      {/* NAV (reuse same style) */}
      <nav className="scrolled">
        <div className="nw">
          <a href="/" className="logo">Rep<em>Tran</em></a>
        </div>
      </nav>

      {/* HERO */}
      <section className="privacy-hero">
        <div className="pw">
          <p className="kicker">Privacy</p>
          <h1>
            Your data is used to support you.<br />
            <em>Not to exploit you.</em>
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="privacy-content">
        <div className="pw">

         <PrivacyBlock
  title="1. Information we collect"
  text={`We collect only the data necessary to provide RepTran's core experience.

• Personal Information: name (optional), email address, and account credentials  
• Activity Data: workouts, streaks, task completion, and interaction with system features  
• Technical Data: device type, app version, and basic diagnostics  

We do not collect unnecessary or unrelated personal data.`}
/>

<PrivacyBlock
  title="2. How your data is used"
  text={`Your data is used to support your consistency journey.

• Personalizing your experience  
• Tracking progress and behavioral patterns  
• Enabling system features like recovery and realignment  
• Improving performance, reliability, and usability  

We do not use your data for manipulation, addiction loops, or exploitative engagement.`}
/>

<PrivacyBlock
  title="3. Notifications"
  text={`RepTran may request permission to send push notifications.

These notifications are used to:
• Remind you to return after inactivity  
• Support your consistency and recovery process  
• Provide important updates about your account  

You can disable notifications at any time from your device settings.

We do not use notifications for spam, ads, or manipulative engagement.`}
/>

<PrivacyBlock
  title="4. Data sharing"
  text={`We do not sell your personal data.

We may share limited data only with:
• Trusted infrastructure providers (hosting, authentication, analytics)  
• Legal authorities when required by law  

All third-party services are required to handle your data securely.`}
/>

<PrivacyBlock
  title="5. Data storage & security"
  text={`Your data is stored securely using modern infrastructure.

• Encryption is used where appropriate  
• Access is restricted and controlled  
• Systems are continuously improved for safety  

No system is completely risk-free, but we actively minimize risks.`}
/>

<PrivacyBlock
  title="6. Your rights"
  text={`You have full control over your data.

• Access your personal data  
• Request correction or updates  
• Request deletion of your account  

To make a request, contact: support@reptran.com`}
/>

<PrivacyBlock
  title="7. Data retention"
  text={`We retain your data only as long as necessary to provide the service.

If you delete your account:
• Your personal data is permanently removed within a reasonable timeframe  
• Some minimal records may be retained if legally required`}
/>

<PrivacyBlock
  title="8. Children’s privacy"
  text={`RepTran is not intended for users under the age of 13.

We do not knowingly collect personal data from children.`}
/>

<PrivacyBlock
  title="9. Changes to this policy"
  text={`We may update this Privacy Policy as the product evolves.

Significant changes will be communicated clearly within the app or via email.`}
/>

<PrivacyBlock
  title="10. Contact"
  text={`If you have questions or concerns:

Email: support@reptran.com  
Website: reptran.com`}
/>

<PrivacyBlock
  title="11. Our philosophy"
  text={`RepTran is built on a simple principle:

Consistency comes from understanding — not pressure.

Your data is used to support your return, not to judge your behavior, 
track streaks, or create guilt loops.

We design for long-term trust, not short-term engagement.`}
/>

        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fw">
          <div className="flogo">Rep<em>Tran</em></div>
        </div>
      </footer>

    </div>
  )
}

function PrivacyBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="privacy-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

