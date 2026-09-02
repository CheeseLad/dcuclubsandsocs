import { useState } from 'react'

const Footer = () => {

  const [showPrivacyBanner, setShowPrivacyBanner] = useState(false)

  //const [showPrivacyBanner, setShowPrivacyBanner] = useState(
  //  !document.cookie.split('; ').some((cookie) => cookie.startsWith('Confirm_Privacy=')),
  //)

  //const closePrivacyBanner = () => {
  //  document.cookie = 'Confirm_Privacy=true; max-age=31536000; path=/; secure'
  //  setShowPrivacyBanner(false)
  //}

  return (
    <><div><div id="modal_feedback" className="modal" tabIndex="-1" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Report a Bug to the Web Admin</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-striped text-left mb-0">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="modal_feedback_name" />
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>
                        <input
                          type="email"
                          className="form-control"
                          id="modal_feedback_email" />
                      </td>
                    </tr>
                    <tr>
                      <th>Page</th>
                      <td>profile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <textarea
                  rows="4"
                  className="form-control"
                  id="modal_feedback_message"
                  placeholder="Your Message"
                ></textarea>
                <input
                  type="hidden"
                  id="modal_feedback_page"
                  value="profile" />
                <input
                  type="hidden"
                  id="modal_feedback_uri"
                  value="/society/redbrick" />
                <div className="form-group mt-3">
                  <div
                    className="load-feedback-g-recaptcha"
                    data-sitekey="6LdWcM4rAAAAAODtTRfRv7z3B1q1lGajirTV5H4M"
                    data-action="feedback"
                    data-callback="enableFeedbackSubmit"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="#"
              className="d-none submit_feedback btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-semibold mr-2"
            >Submit</a>
            <button
              type="button"
              className="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-semibold"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </div><footer
      className="footer-social-icon text-center section_padding_100_50 clearfix"
      style={{zIndex: -101, position: 'fixed', bottom: 0, width: '2048px'}}
    >
        <div className="footer-text">
          <h3>
            <a
              href="https://dcuclubsandsocs.ie/"
            >DCU Clubs &amp; Socs
            </a>
          </h3>
        </div>

        <div className="footer-social-icon">
          <a
            href="https://www.facebook.com/dcustudentsunion"
            aria-label="Facebook"
            target="_blank"
            rel="noopener"
          ><i
            className="fab fa-2x fa-fw fa-facebook-f"
            data-toggle="tooltip"
            title=""
            aria-hidden="true"
            data-original-title="Facebook"
          ></i></a>
          <a
            href="https://twitter.com/DCUSU"
            aria-label="Twitter"
            target="_blank"
            rel="noopener"
          ><i
            className="fab fa-2x fa-fw fa-twitter"
            data-toggle="tooltip"
            title=""
            aria-hidden="true"
            data-original-title="Twitter"
          ></i></a>
          <a
            href="https://www.youtube.com/user/DCUSU"
            aria-label="YouTube"
            target="_blank"
            rel="noopener"
          ><i
            className="fab fa-2x fa-fw fa-youtube"
            data-toggle="tooltip"
            title=""
            aria-hidden="true"
            data-original-title="YouTube"
          ></i></a>
          <a
            href="https://www.instagram.com/dcu_su/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener"
          ><i
            className="fab fa-2x fa-fw fa-instagram"
            data-toggle="tooltip"
            title=""
            aria-hidden="true"
            data-original-title="Instagram"
          ></i></a>
        </div>

        {/*<div className="footer-menu">
          <nav>
            <ul className="pl-0">
              <li>
                <h4>
                  <a
                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support/privacy"
                  >Privacy Notice</a>
                </h4>
              </li>
            </ul>
          </nav>
        </div>*/}

        <div className="footer-menu">
          <nav>
            <ul className="pl-0">
              <li>
                <a
                  href="https://dcustudentlife.ie/"
                  target="_blank"
                  rel="noopener"
                >DCU Student Life</a>
              </li>
              <li>
                <a
                  href="http://www.dcu.ie/"
                  target="_blank"
                  rel="noopener"
                >Dublin City University</a>
              </li>
              <li>
                <a
                  href="http://bics.ie/"
                  target="_blank"
                  rel="noopener"
                >BICS <small>(College Societies)</small></a>
              </li>
              <li>
                <a
                  href="http://www.studentsport.ie/"
                  target="_blank"
                  rel="noopener"
                >SSI <small>(Student Sport)</small></a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="copyright-text">
          <p>Copyright ©2026. All Rights Reserved</p>

          <div className="d-block text-center mt-4">
            <a
              href="https://campus.hellorubric.com/search?type=societies&country=IE&state=Leinster&universityid=541"
              target="_blank"
              className="btn btn-warning btn-sm px-3"
              //data-toggle="modal"
              //data-target="#modal_feedback"
            ><i className="fa fa-bug mr-1"></i> This is a parody site, click here to go to the real DCU Clubs &amp; Socs website
              <i className="fa fa-bug ml-1"></i></a>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-3">
            <span className="pt-3">Built and maintained by</span>
            <a
              target="_blank"
              className="px-2"
              href="https://assurememberships.com/"
            ><img
                height="50"
                src="/am-logo-border.png"
                alt="Assure Memberships" /></a>
          </div>
        </div>
      </footer>{showPrivacyBanner && <div id="confirm_privacy">
        <div className="float-left">
          <p className="text-light">
            DCU Clubs &amp; Socs does not use any third-party cookies. We only use
            cookies required for the website to function. No personal data is
            shared outside of DCU Clubs &amp; Socs.
          </p>
          By continuing to use this site you are agreeing to the
          <b
          ><a
            className="text-info"
            data-toggle="modal"
            data-target="#modal_privacy_policy"
            href="#"
          >DCU Clubs &amp; Socs Privacy Notice</a></b>
        </div>
        <button
          type="button"
          className="close_privacy btn btn-light float-right mr-2"
          onClick={closePrivacyBanner}
        >
          Accept &amp; Close
        </button>
      </div>}<div id="modal_privacy_policy" className="modal" tabIndex="-1" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-xl mb-5 pb-5"
          role="document"
        >
          <div className="modal-content mb-5 pb-5">
            <div className="modal-header">
              <h5 className="modal-title">DCU Clubs &amp; Socs Privacy Notice</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body justify_paragraphs px-md-5">
              <h2>Introduction</h2>
              <p>
                The Office of Student Life together with its Clubs &amp; Societies
                Department (DCU Life) are committed to protecting your privacy and
                to be transparent about what information we hold. We understand
                our obligations to you to help you understand how and why we
                process your personal data.
              </p>
              <p>
                This privacy notice sets out the basis by which we collect, use
                and disclose the personal data of our Clubs &amp; Society members,
                as well as your rights in respect of such personal data.
              </p>
              <p>
                We may update this privacy notice from time to time. The version
                available online will always be the most up to date current
                version and your notifications will be through the webpage.
              </p>
              <h2>How we collect your Personal Data</h2>
              <p>
                You will have provided all of the information we hold, when you
                complete our DCU Life on-line Club/Society membership account
                form, as the preparatory step to join the Club and/or Society of
                your choice.
              </p>
              <p>
                If you choose not to provide that personal data when requested, we
                will not be able to permit your membership of any Club or Society.
              </p>
              <p>
                When you visit our website, we automatically collect certain
                information about your device, including information about your
                web browser, operating system, IP address, time zone, and some of
                the cookies installed on your device. Additionally, as you browse
                our website, we collect information about the individual web pages
                or content that you view, what websites or search terms referred
                you to our website, and information about how you interact with
                our website.
              </p>
              <p></p>
              <ul className="ml-3">
                <li>
                  “Cookies” are data files inserted on your device or computer and
                  often include an anonymous unique identifier. Our website
                  requires cookies in order to be able to function and access is
                  not possible without you enabling these cookies.
                </li>
                <li>
                  “Log files” track actions occurring on our website, and collect
                  data including your IP address, browser type, Internet service
                  provider, referring/exit pages, and date/time stamps.
                </li>
                <li>
                  “Web beacons,” “tags,” and “pixels” are electronic files used to
                  record information about how you browse our website.
                </li>
              </ul>
              <p></p>
              <h2>Type of personal data we collect and process</h2>
              <p>
                When setting up a Clubs &amp; Society DCU Life account, we will
                collect and gather the following categories of personal data,
              </p>
              <p>
                <b>Identity data;</b> Name, Home Country, Date of Birth, Gender
              </p>
              <p>
                <b>Contact details;</b> Telephone number(s), Address, E-mail
                Address
              </p>
              <p>
                <b>In Case of Emergency Details;</b> Name, Relationship, Telephone
                number
              </p>
              <p>
                <b>Education/Employment Details;</b> Student/Staff Status, Student
                ID Number, Course/Department, Year of Study
              </p>
              <p>
                <b>Medical Data;</b> On line tick Box, GP's Letter of referral
              </p>
              <h2>How we use your personal data</h2>
              <p></p>
              <ol className="ml-3">
                <li>
                  Verify your identity to permit membership of a Club and/or
                  Society.
                </li>
                <li>Correct and update information at your request.</li>
                <li>Comply with a legal or regulatory obligation.</li>
                <li>
                  Dealing with issues of Health &amp; Safety, processing possible
                  insurance claims, and/or “In Case of Emergency Numbers” whilst
                  engaged in the activities of Clubs &amp; Societies, in
                  particular when overseas. Both the Staff of the Clubs &amp;
                  Societies Department &amp; the individual C&amp;S; Committee
                  members that volunteer to organise and run the activities of
                  their specific club and/or society you may choose to join, will
                  have access to this particular data.
                </li>
                <li>
                  Communicating with you via email, phone or post in relation to
                  matters specific to Clubs &amp; Societies from the Clubs &amp;
                  Societies Department or from the individual C&amp;S; Committee
                  members that volunteer to organise and run the activities of
                  their specific club and/or society you may choose to join. You
                  have the right to withdraw your consent to communications at any
                  time by using the tools within the website or contacting us via
                  to email.
                </li>
                <li>
                  If elected by the membership of a particular Club/Society to the
                  position of a committee member, we will provide where approved
                  by you, your name, preferred email and mobile number via our
                  website and touch screens. This is for contact by
                  <ul className="ml-3">
                    <li>Potential new members</li>
                    <li>Current Members.</li>
                  </ul>
                </li>
                <li>
                  Occasionally we conduct surveys on your particular experience
                  within Clubs &amp; Societies to help assist with the continuous
                  improvement and development of the service. A professional third
                  party is engaged however your data cannot be identified or
                  utilised, and will only be used for purposes specific to the
                  Clubs &amp; Societies, agreed and set by the Clubs &amp;
                  Societies Department.
                </li>
                <li>
                  Your personal data may be used to generate previous membership
                  contact lists for special events such as Club and Society
                  Re-Unions or DCU Clubs &amp; Socs Re-Unions/ specific
                  initiatives that may be of interest to you because of your
                  membership of Clubs &amp; Societies.
                </li>
                <li>
                  We also use Google Analytics to help us understand how you use
                  our website.
                </li>
              </ol>
              <p></p>
              <h2>Legal basis for processing your personal data</h2>
              <p>
                The legal basis upon which we hold personal data is the following:
              </p>
              <p></p>
              <ul className="ml-3">
                <li>
                  Our legitimate interest and the interest of the Clubs and
                  Societies which operate under our umbrella: we require this
                  information about our members in order to fulfil our function
                  providing services to our members and the student body.
                </li>
                <li>
                  Legal Obligation: We and the individual Clubs and Societies have
                  legal obligations, including for example, obligations to ensure
                  the safety our members and third parties pursuant to which it is
                  necessary to hold the information retained.
                </li>
                <li>
                  Performance of Contract: We and the individual Clubs and
                  Societies may enter contractual arrangements with members and
                  third parties and information is required in order to complete
                  the performance of such contractual obligation.
                </li>
                <li>
                  Consent: Where none of the above bases apply, we will obtain and
                  process personal data only with your consent, which you may
                  withdraw at any time.
                </li>
              </ul>
              <p></p>
              <h2>
                Existing Data Information with Clubs &amp; Societies (DCU Life)
              </h2>
              <p>
                We will use our best endeavours to guarantee that all Personal
                Data that you have submitted to us is maintained and up to date.
                However, it is your responsibility to inform us of any changes to
                your Personal Data to ensure that it is up to date.
              </p>
              <h2>Marketing</h2>
              <p>
                If you are a Club or Society committee member, we may also pass
                information to you directly to assist with the promotion and
                development of your particular Club or Society i.e.
                offers/discounts/sponsorship from Hotels, Entertainments, Travel
                providers. We will not share your personal data with these
                providers.
              </p>
              <h2>Sharing your data with others</h2>
              <p>
                We do not disclose to any third party personal data that we may
                collect or you provide to us with the exception of third parties
                expressly mentioned in this privacy policy.
              </p>
              <p></p>
              <ol className="ml-3">
                <li>
                  Personal data collected by us is shared as necessary with
                  individual Clubs and Societies which you join.
                </li>
                <li>
                  Personal data, in particular contact details is shared between
                  members of the Clubs &amp; Society department, who legitimately
                  need the information to carry out their normal duties to promote
                  Clubs &amp; Societies that may be of a legitimate interest to
                  you.
                </li>
                <li>
                  We contract with other entities in particular the hosting
                  provider, web developer and/or tech support to perform certain
                  tasks on our behalf and who have a Data Sharing Agreement with
                  Clubs &amp; Societies (DCU Life).
                </li>
                <li>
                  Professional advisors such as solicitors and insurers and other
                  outside professional advisors (i.e. Health &amp; Safety
                  Consultants) relevant to the activity of Clubs &amp; Societies
                  only
                </li>
                <li>
                  We require that all third parties respect your personal data,
                  and to treat it in accordance with the law. We do not allow our
                  service providers to use your personal data for their own
                  purposes and only permit them to process your personal data for
                  specified purposes and in accordance with our instructions.
                </li>
                <li>
                  Unless prevented by applicable law, we will notify you when it
                  might be necessary to provide your personal data to third
                  parties in ways other than explained above, and you may have the
                  option to prevent such sharing at the time that we notify you.
                </li>
                <li>
                  There may be other reasons where it is not possible or
                  appropriate to gain your consent such as disclosures to the
                  Gardaí for prevention or detection of crime, or to meet
                  statutory obligations.
                </li>
              </ol>
              <p></p>
              <h2>Data Retention</h2>
              <p></p>
              <ul className="ml-3">
                <li>
                  Any person who creates an on-line membership account and
                  provides all their personal data but then chooses NOT to join
                  any club or society during that Academic Year will have all
                  their data deleted at the end of every year.
                </li>
                <li>
                  People who do join Clubs &amp; Societies and become active
                  members during their undergraduate and/or postgraduate studies
                  or even as Alumni will have all personal data deleted after a
                  period of 7 years from the date upon which they cease to be a
                  member of a Club or Society.
                </li>
              </ul>
              <p></p>
              <h2>Rights</h2>
              <p>You have the following rights;</p>
              <p>
                <u><b>Right to be informed</b></u><br />This Privacy notice provides the information you are
                entitled to receive on how your data is collected, stored and
                processed. In a clear and accessible way.
              </p>
              <p>
                <u><b>Right of Access</b></u><br />Please contact us if you would like to request access to a
                copy of your data in electronic form There is no charge for us
                providing you with this data and it will usually be provided
                within one month of the request. However, we may charge a
                reasonable fee if your request is clearly unfounded, repetitive or
                excessive. Alternatively, we may refuse your request in these
                circumstances. We may need specific information from you to help
                us confirm your identity and ensure your right to access.
              </p>
              <p>
                <u><b>Right of correction/deletion</b></u><br />You may exercise your right to have your personal data
                erased in a number of circumstances e.g. if the data is no longer
                necessary in relation to the purpose for which it was created or
                you withdraw consent. If you have provided consent for the
                processing of your data, you have the right (in certain
                circumstances) to withdraw that consent at any time which will not
                affect the lawfulness of the processing, before your consent was
                withdrawn.
              </p>
              <h2>Security</h2>
              <p>The security of your Personal Data is very important to us.</p>
              <p>
                We will ensure that we have in place appropriate technical and
                organisational measures to prevent unauthorised or unlawful
                processing of Personal Data and against accidental loss or
                destruction of, or damage to Personal Data. We use a variety of
                security technologies and procedures to help protect your personal
                information from unauthorised access, use or disclosure.
              </p>
              <h2>
                Identity and contact details of controller and data protection
                officer
              </h2>
              <p>
                Clubs &amp; Societies (DCU Life) under the auspices of DCU Clubs
                &amp; Socs is the controller and processor of data for the
                purposes of the Data Protection Act.
              </p>
              <p>
                <b
                >If you have any concerns as to how your data is processed you
                  can contact;</b>
              </p>
              <p>
                Siobhan Byrne, <br />Head of Clubs &amp; Socs<br />The U<br />Dublin
                City University<br />01 700 5585<br />siobhan.byrne@dcu.ie
              </p>
              <p>
                <b
                >Any complaints with regard to this policy should be directed
                  to:</b>
              </p>
              <p>
                Una Redmond,<br />General Manager, <br />
                DCU Students' Union<br />Dublin City University<br />01 700
                5280<br />
                una.redmond@dcu.ie
              </p>
              <p>
                <b
                >You also have a right to complain to the Data Protection
                  Commissioner:</b>
              </p>
              <p>
                <a
                  href="https://www.dataprotection.ie/"
                  target="_blank"
                >dataprotection.ie</a><br />21 Fitzwilliam Square South<br />Dublin 2<br />D02 RD28<br />Ireland<br />+353
                578 684 800<br />+353 761 104 800
              </p>
              <p>
                Or to apply for review by the Court pursuant to the Data
                Protection Act, 2018.
              </p>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default Footer