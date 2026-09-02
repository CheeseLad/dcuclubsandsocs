import socs from "./data/socs.json";
import { useState, useEffect } from "react";

const Header = () => {
  const [societyList, setSocietyList] = useState(null);

  async function fetchSocietyList() {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      firstCall:true,
      sortType: "itemName",
      desiredType: "societies",
      state: "Leinster",
      country: "IE",
      universityid: 541,
      limit:1000,
      offset:0,
      sortDirection:"asc",
      searchQuery:"",
      eventsPeriodFilter:"All",
      domain: "campus.hellorubric.com",
      currentUrl: `https://hellorubric.com/search?type=societies&country=IE&state=Leinster&universityid=541`,
      device: "web_portal",
      version: 4,
      timestamp: Date.now(), // Dynamically uses the current exact time
    };

    // Build application/x-www-form-urlencoded format
    const formBody = new URLSearchParams({
      endpoint: "getUnifiedSearch",
      details: JSON.stringify(detailsPayload),
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
        },
        body: formBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Society List Received:", data.results);
      setSocietyList(data.results);
      return data;
    } catch (error) {
      console.error("Failed to fetch society landing page:", error);
    }
  }

  useEffect(() => {
    fetchSocietyList();
  }, []);

  return (
    <div>
      <header className="header_area animated">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="menu_area">
                <nav className="navbar navbar-expand-xl navbar-light" id="nav">
                  <a
                    className="navbar-brand"
                    href="/"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="DCU Clubs &amp; Socs Home"
                  >
                    <img
                      src="/dcu-cs-logo2024.png"
                      title="DCU Clubs &amp; Socs"
                      alt="DCU Clubs &amp; Socs"
                    />
                  </a>

                  <div>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#ca-navbar"
                      aria-controls="ca-navbar"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>

                  <div
                    className="collapse navbar-collapse"
                    id="ca-navbar"
                    style={{ maxHeight: "939px" }}
                  >
                    <ul className="navbar-nav nav-mini">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/about"
                        >
                          <i className="fa fa-fw fa-info-circle mr-2"></i> About
                          / Links
                        </a>
                      </li>


                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/societies/list"
                        >
                          <i className="fa fa-fw fa-list-ul mr-2"></i> Societies
                          List
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/whatson"
                        >
                          <i className="fa fa-fw fa-calendar mr-2"></i> What's
                          On
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support"
                        >
                          <i className="fa fa-fw fa-question-circle mr-2"></i>{" "}
                          Help / Support
                        </a>
                      </li>

                      <li className="dropdown-divider"></li>

                      <li className="nav-item">
                        <a
                          href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/login"
                          className="nav-link"
                        >
                          <i className="fa fa-fw fa-sign-in-alt mr-2"></i> Log
                          In / Register
                        </a>
                      </li>
                    </ul>

                    <ul className="navbar-nav nav-mega ml-auto">
                      <li className="nav-item">
                        <div className="dropdown">
                          <a
                            href="#"
                            className="nav-link"
                            id="dropdownMenuAbout"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fa fa-sm fa-info-circle mr-2"></i>
                            About
                          </a>
                          <ul
                            className="dropdown-menu mega-menu"
                            aria-labelledby="dropdownMenuAbout"
                          >
                            <li className="container">
                              <div className="row">
                                <div className="col-12 col-sm-4 text-center">
                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/about"
                                    className="dropdown-item dropdown-header text-uppercase"
                                  >
                                    ABOUT DCU
                                  </a>

                                  <hr className="mt-2" />

                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/about/awards"
                                    data-toggle="tooltip"
                                    title=""
                                    className="dropdown-item"
                                    data-original-title="Awards Roll of Honour"
                                  >
                                    Awards Roll of Honour&nbsp;»
                                  </a>
                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/about/rooms"
                                    data-toggle="tooltip"
                                    title=""
                                    className="dropdown-item"
                                    data-original-title="Rooms Availabilities"
                                  >
                                    Rooms Availabilities&nbsp;»
                                  </a>
                                </div>

                                <div className="col-12 col-sm-4 text-center">
                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/about"
                                    className="dropdown-item dropdown-header text-uppercase"
                                  >
                                    &nbsp;
                                  </a>

                                  <hr className="mt-2" />
                                </div>

                                <div className="col-12 col-sm-4 text-center">
                                  <button
                                    disabled="disabled"
                                    className="dropdown-item dropdown-header text-uppercase"
                                  >
                                    EXTERNAL LINKS
                                  </button>

                                  <hr className="mt-2" />

                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcustudentlife.ie/"
                                    target="_blank"
                                    data-toggle="tooltip"
                                    title=""
                                    rel="noopener"
                                    className="dropdown-item"
                                    data-original-title="DCU Student Life"
                                  >
                                    DCU Student Life&nbsp;»
                                  </a>
                                  <a
                                    href="https://web.archive.org/web/20260312165547/http://www.dcu.ie/"
                                    target="_blank"
                                    data-toggle="tooltip"
                                    title=""
                                    rel="noopener"
                                    className="dropdown-item"
                                    data-original-title="Dublin City University"
                                  >
                                    Dublin City University&nbsp;»
                                  </a>
                                  <a
                                    href="https://web.archive.org/web/20260312165547/http://bics.ie/"
                                    target="_blank"
                                    data-toggle="tooltip"
                                    title=""
                                    rel="noopener"
                                    className="dropdown-item"
                                    data-original-title="BICS (College Societies)"
                                  >
                                    BICS
                                    <small>(College Societies)</small>&nbsp;»
                                  </a>
                                  <a
                                    href="https://web.archive.org/web/20260312165547/http://www.studentsport.ie/"
                                    target="_blank"
                                    data-toggle="tooltip"
                                    title=""
                                    rel="noopener"
                                    className="dropdown-item"
                                    data-original-title="SSI (Student Sport)"
                                  >
                                    SSI <small>(Student Sport)</small>&nbsp;»
                                  </a>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>

                    

                      <li>
                        <div className="dropdown">
                          <a
                            href="#"
                            className="nav-link"
                            id="dropdownMenuSocieties"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fa fa-sm fa-list-ul mr-2"></i>
                            Societies
                          </a>
                          <ul
                            className="dropdown-menu mega-menu"
                            aria-labelledby="dropdownMenuSocieties"
                          >
                            <li className="container">
                              <div className="col-12 text-center">
                                <a
                                  href="societies"
                                  className="dropdown-item dropdown-header"
                                >
                                  Go to ALL SOCIETIES page »
                                </a>
                              </div>

                              <hr className="mt-2" />
                              <div className="row">
                                {socs.map((society, index) => (
                                  <div
                                    key={index}
                                    className="col-12 col-sm-4 col-md-3"
                                  >
                                    <a
                                      href={`/society/${society.societyid}`}
                                      data-toggle="tooltip"
                                      title=""
                                      className="dropdown-item"
                                      data-original-title={society.title}
                                    >
                                      ‐&nbsp;{society.title}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="nav-item">
                        <div>
                          <a
                            href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/whatson"
                            className="nav-link"
                          >
                            <i className="fa fa-sm fa-calendar mr-2"></i>What's
                            On
                          </a>
                        </div>
                      </li>

                      <li className="nav-item">
                        <div className="dropdown">
                          <a
                            href="#"
                            className="nav-link"
                            id="dropdownMenuHelp"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fa fa-question-circle mr-2"></i>
                            Support
                          </a>
                          <ul
                            className="dropdown-menu mega-menu"
                            aria-labelledby="dropdownMenuHelp"
                          >
                            <li className="container">
                              <div className="row">
                                <div className="col-12 col-sm-4 text-center">
                                  <button
                                    className="dropdown-item dropdown-header disabled"
                                    type="button"
                                  >
                                    MEMBER SUPPORT
                                  </button>

                                  <hr className="mt-2" />

                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/login/help"
                                    className="dropdown-item"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Reset A Forgotten Password or Resend Your Activation Email"
                                  >
                                    Account/Password Help »
                                  </a>
                                </div>

                                <div className="col-12 col-sm-4 text-center">
                                  <button
                                    className="dropdown-item dropdown-header disabled"
                                    type="button"
                                  >
                                    COMMITTEE SUPPORT
                                  </button>

                                  <hr className="mt-2" />

                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support/resources"
                                    className="dropdown-item"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Committee Resource Documents"
                                  >
                                    Resource Documents »
                                  </a>
                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support/guide"
                                    className="dropdown-item"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="DCU Clubs &amp; Socs Leaders Handbook"
                                  >
                                    Clubs &amp; Socs Handbook »
                                  </a>
                                </div>

                                <div className="col-12 col-sm-4 text-center">
                                  <button
                                    className="dropdown-item dropdown-header disabled"
                                    type="button"
                                  >
                                    CONTACT INFO
                                  </button>

                                  <hr className="mt-2" />

                                  <a
                                    href="#contact"
                                    className="dropdown-item"
                                    data-toggle="tooltip"
                                    title=""
                                    data-original-title="Click Here to Send a Message"
                                  >
                                    <i className="fa fa-envelope pr-1"></i> Send
                                    a Contact Message
                                  </a>

                                  <a
                                    href="https://web.archive.org/web/20260312165547/tel:+353(0)17006164"
                                    target="_blank"
                                    rel="noopener"
                                    data-toggle="tooltip"
                                    title=""
                                    className="dropdown-item"
                                    data-original-title="Clubs &amp; Societies Support Phone"
                                  >
                                    <i className="fa fa-phone pr-1"></i> +353
                                    (0)1 700 6164
                                  </a>

                                  <a
                                    href="https://web.archive.org/web/20260312165547/https://www.google.com/maps/place/DCU+Students'+Union/@53.384867,-6.2613317,17z/data=!3m1!4b1!4m5!3m4!1s0x48670e110cd74671:0xa78b9dfd83342beb!8m2!3d53.384867!4d-6.259143"
                                    target="_blank"
                                    rel="noopener"
                                    data-toggle="tooltip"
                                    title=""
                                    className="dropdown-item"
                                    data-original-title="Find Clubs &amp; Societies Support Location on Google Maps"
                                  >
                                    <i className="fa fa-map-marker-alt pr-1"></i>
                                    Clubs &amp; Societies Support Location
                                  </a>
                                </div>
                              </div>
                            </li>

                            <div className="d-block text-center mt-2">
                              <a
                                href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support/faqs"
                                className="btn btn-info btn-sm px-3 mx-3"
                              >
                                <i className="fa fa-question-circle mr-2"></i>
                                FAQs
                              </a>

                              <a
                                href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/support/privacy"
                                className="btn btn-dark btn-sm px-3 mx-3"
                              >
                                <i className="fa fa-exclamation-circle mr-2"></i>
                                Privacy Notice
                              </a>
                            </div>
                          </ul>
                        </div>
                      </li>
                    </ul>

                    <div className="sign-up-button ml-3 d-none d-xl-block">
                      <a href="https://web.archive.org/web/20260312165547/https://dcuclubsandsocs.ie/login">
                        Log In / Register
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
