'use client'

export default function DeleteAccountPage() {
  return (
    <div className="privacy-page">

      {/* NAV */}
      <nav className="scrolled">
        <div className="nw">
          <a href="/" className="logo">Rep<em>Tran</em></a>
        </div>
      </nav>

      {/* HERO */}
      <section className="privacy-hero">
        <div className="pw">
          <p className="kicker">Account</p>
          <h1>
            Delete your account.<br />
            <em>Completely and permanently.</em>
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="privacy-content">
        <div className="pw">

          <Block
            title="What happens when you delete your account"
            text={`Deleting your account will permanently remove your personal data from RepTran.

• Your profile information  
• Your progress and streaks  
• Your activity history  
• Any stored preferences  

This action cannot be undone.`}
          />

          <Block
            title="Data retention"
            text={`We do not retain your personal data after account deletion.

Some minimal records may be retained only if required for legal or security purposes.`}
          />

          <Block
            title="How to delete your account"
            text={`To delete your account:

• Log in to your account  
• Go to Settings → Account  
• Tap "Delete Account"  

If you are unable to access your account, contact us at: support@reptran.com`}
          />

          <Block
            title="Need help?"
            text={`If you face any issues while deleting your account, reach out to us.

Email: support@reptran.com`}
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

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div className="privacy-block">
      <h3>{title}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}