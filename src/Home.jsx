import { Link } from 'react-router'

const membershipSteps = [
  ['01', 'Create your account', 'Sign in with your DCU student email to begin.'],
  ['02', 'Request membership', 'Choose as many clubs and societies as you like.'],
  ['03', 'Get involved', 'Meet the committee and start taking part.'],
]

function Home() {
  return (
    <main id="pagemain" className="bg-white home-page">
      <section className="frontend_top clearfix" id="home">
        <div className="rotating_bgs" aria-hidden="true" />
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 col-md-10 col-lg-7 card">
              <div className="card-body">
                <div className="frontend_top-heading">
                  <p className="text-uppercase mb-2">Find your people at DCU</p>
                  <h2>DCU Clubs &amp; Socs</h2>
                  <h3> </h3>
                  <p>Make your time at Dublin City University bigger, brighter and more connected.</p>
                </div>
                <div className="get-start-area">
                  <Link to="/societies" className="btn btn-dark btn-block">
                    Explore societies <i className="fa fa-arrow-right ml-2" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="welcome-border">
            <img src="/wave.png" className="img-full w-100" alt="---"/>
        </div>
      </section>

      <section className="special-area bg-white pt-5 pb-5" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="section-heading">
                <h2>Welcome to DCU Clubs & Socs</h2>
                <div className="line-shape" />
              </div>
              <p>There are over 140 Clubs & Societies in DCU spread across campuses and they cater for all interests, hobbies and passions. You can even set up your own! From developing existing skills to trying something completely new, joining a DCU club or society is one of the best decisions you will make in DCU. Involvement in club and society activity gives you a welcome break from your academic studies and the skills and competencies gained through committees and other organisational work will really enhance your CV and give you that extra edge in the your future career. In addition, being involved in DCU clubs and societies will enhance your social life and help you make lifelong friends as well as creating memories to treasure for life.</p>
              <div className="app-download-area">
                <div className="app-download-btn"><Link to="/societies"><i className="fa fa-users" aria-hidden="true" /><p className="mb-0"><span>Browse all</span> SOCIETIES</p></Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="awesome-feature-area bg-white section_padding_100_50"><div className="container">
        <div className="section-heading text-center"><h2>How membership works</h2><div className="line-shape" /></div>
        <div className="row">{membershipSteps.map(([number, title, text]) => (
          <div className="col-12 col-md-4" key={number}><div className="single-special text-center"><div className="circle-icon">{number}</div><h4>{title}</h4><p>{text}</p></div></div>
        ))}</div>
      </div></section>

      <section className="our-monthly-membership section_padding_50 clearfix"><div className="container"><div className="row align-items-center">
        <div className="col-md-8"><div className="membership-description"><h2>Ready to find your thing?</h2><p>Explore DCU Clubs &amp; Socs and make this year count.</p></div></div>
        <div className="col-md-4"><div className="get-started-button"><Link to="/societies">Browse societies</Link></div></div>
      </div></div></section>
    </main>
  )
}

export default Home
