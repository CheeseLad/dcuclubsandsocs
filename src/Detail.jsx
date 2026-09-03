import { useEffect, useState } from "react";
import { useParams } from 'react-router'

const Detail = () => {

  const { id } = useParams()

  const [societyData, setSocietyData] = useState(null);
  const [eventDetails, setEventDetails] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    links: true,
    events: true,
    about: true,
    committee: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  };

  async function fetchSocietyLandingPage(societyId = "14274") {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      societyid: societyId,
      domain: "campus.hellorubric.com",
      currentUrl: `https://hellorubric.com{societyId}`,
      device: "web_portal",
      version: 4,
      timestamp: Date.now(), // Dynamically uses the current exact time
    };

    // Build application/x-www-form-urlencoded format
    const formBody = new URLSearchParams({
      endpoint: "getSocietyLandingPage",
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
      //console.log("Society Data Received:", data);
      setSocietyData(data);
      document.title = `${data.name} | DCU Clubs & Socs`;
      return data;
    } catch (error) {
      console.error("Failed to fetch society landing page:", error);
    }
  }

  async function fetchEventDetails(eventId, societyId = "14274") {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      eventId: eventId.toString(),
      currentUrl: `https://hellorubric.com{societyId}`,
      device: "web_portal",
      version: 4,
      timestamp: Date.now(), // Dynamically uses the current exact time
    };
    
    // Build application/x-www-form-urlencoded format
    const formBody = new URLSearchParams({
      details: JSON.stringify(detailsPayload),
      endpoint: "https://appserver.getqpay.com:9090/AppServerSwapnil/event/details",
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
      //console.log("Event Details Received:", data);
      setEventDetails((currentDetails) => ({
        ...currentDetails,
        [eventId]: data.eventDetails,
      }));
      return data;
    }
    catch (error) {
      console.error("Failed to fetch event details:", error);
    }
  }


  useEffect(() => {
    if (!id) return;
    //console.log("Fetching society landing page for ID:", id);
    fetchSocietyLandingPage(id);
  }, [id]);

  return (
    <div>
      {" "}
      <div
        id="pagemain"
        className="bg-white"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 20px 30px -20px",
          //marginBottom: "516px",
        }}
      >
        <div id="pagecover"></div>

        <section className="main_top clearfix" id="home"></section>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center pt-5">
                <h2>{societyData?.name}</h2>

                <div className="line-shape"></div>
              </div>
            </div>
          </div>
        </div>

        <section className="clearfix faded-bg">
          <div className="px-3 pb-5 h-100">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="my-4">
                  <i>{societyData?.name}</i>
                </h2>
              </div>
            </div>

            <div className="row pt-3">
              <div className="col-12 col-lg-4 pr-lg-0">
                <div
                  className="wow fadeInDown w-100 mb-3"
                  data-wow-delay="0.5s"
                >
                  <a href={societyData?.logo_uploaded} className="lightbox">
                    <img
                      className="img-thumbnail w-100"
                      src={societyData?.logo_uploaded}
                      alt=""
                    />
                  </a>
                </div>

                <div className="card mb-3 collapse_section">
                  <h5
                    className={`card-header bg-dark text-light pointer collapse_title ${expandedSections.links ? "active" : ""}`}
                    data-toggle="collapse"
                    data-target="#links_table"
                    aria-expanded={expandedSections.links}
                    onClick={() => toggleSection("links")}
                  >
                    <i className="fa fa-lg mr-3"></i>
                    {societyData?.name} Links
                  </h5>
                  <div
                    className="card-body bg-secondary table-responsive pb-0 collapse show"
                    id="links_table"
                  >
                    <a
                      className="btn-light btn btn-lg btn-block mb-3"
                      href={`mailto:${societyData?.societyemail}@${societyData?.emaildomain}`}
                    >
                      <i className="fa fa-envelope mr-2"></i>Message{" "}
                      {societyData?.name}
                    </a>

                    <div className="text-center">
                      {societyData?.discordurl && (
                        <a
                          href={societyData?.discordurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="Discord Server"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-primary bg-primary mb-3 mx-1"
                          data-original-title="Discord Server"
                        >
                          <i className="fab fa-fw fa-3x fa-discord"></i>
                        </a>
                      )}

                      {societyData?.websiteurl && (
                        <a
                          href={societyData?.websiteurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="External Homepage"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-light mb-3 mx-1"
                          data-original-title="External Homepage"
                        >
                          <i className="fas fa-fw fa-3x fa-home"></i>
                        </a>
                      )}

                      {societyData?.facebookurl && (
                        <a
                          href={societyData?.facebookurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="Facebook Page"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-primary bg-primary mb-3 mx-1"
                          data-original-title="Facebook Page"
                        >
                          <i className="fab fa-fw fa-3x fa-facebook-f"></i>
                        </a>
                      )}

                      {societyData?.twitterurl && (
                        <a
                          href={societyData?.twitterurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="X User"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-info mb-3 mx-1"
                          data-original-title="X User"
                        >
                          <i className="fab fa-fw fa-3x fa-twitter"></i>
                        </a>
                      )}

                      {societyData?.instagramurl && (
                        <a
                          href={societyData?.instagramurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="Instagram Profile"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-dark mb-3 mx-1"
                          data-original-title="Instagram Profile"
                        >
                          <i className="fab fa-fw fa-3x fa-instagram"></i>
                        </a>
                      )}
                      {societyData?.youtubeurl && (
                        <a
                          href={societyData?.youtubeurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="Youtube Channel"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-secondary bg-danger mb-3 mx-1"
                          data-original-title="Youtube Channel"
                        >
                          <i className="fab fa-fw fa-3x fa-youtube"></i>
                        </a>
                      )}

                      {societyData?.linkedinurl && (
                        <a
                          href={societyData?.linkedinurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="LinkedIn Profile"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-info mb-3 mx-1"
                          data-original-title="LinkedIn Profile"
                        >
                          <i className="fab fa-fw fa-3x fa-linkedin-in"></i>
                        </a>
                      )}

                      {societyData?.tiktokurl && (
                        <a
                          href={societyData?.tiktokurl}
                          data-toggle="tooltip"
                          title=""
                          aria-label="TikTok Profile"
                          target="_blank"
                          rel="noopener"
                          className="btn btn-dark mb-3 mx-1"
                          data-original-title="TikTok Profile"
                        >
                          <i className="fab fa-fw fa-3x fa-tiktok"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-8">
                <div className="card mb-3 collapse_section" id="events">
                  <h5
                    className={`card-header bg-dark text-light pointer collapse_title ${expandedSections.events ? "active" : ""}`}
                    data-toggle="collapse"
                    data-target="#events_table"
                    aria-expanded={expandedSections.events}
                    onClick={() => toggleSection("events")}
                  >
                    <i className="fa fa-lg mr-3"></i>
                    Upcoming Event{societyData?.sections[0]?.array.length !== 1 ? "s" : ""}
                    <span className="float-right badge badge-light">
                      {societyData?.sections[0]?.array.length}
                    </span>
                  </h5>
                  <div
                    className="card-body p-0 collapse show"
                    id="events_table"
                  >
                    <div className="table-responsive">
                      {societyData?.sections[0]?.array.map((event, index) => (
                        <table
                          key={index}
                          className="table table-striped mb-0"
                        >
                          <tbody>
                            <tr
                              className="show_info pointer"
                              data-id={event.eventid}
                              data-type="event"
                            >
                              <td
                                className="text-center align-top p-0"
                                id="activity_img_644"
                                rowSpan="2"
                                style={{ minWidth: "150px", width: "150px" }}
                              >
                                <a href={event.image} className="lightbox">
                                  <img
                                    className="img-thumbnail"
                                    src={event.image}
                                    style={{ width: "150px" }}
                                  />
                                </a>
                              </td>
                              <th colSpan="7" className="h5 align-middle">
                                <i className="fa fa-calendar-day mr-3"></i>
                                {event.title}{" "}
                              </th>
                            </tr>
                            <tr
                              className="show_info pointer"
                              data-id={event.eventid}
                              data-type="event"
                            >
                              <td className="text-center align-middle"></td>
                              <td className="text-center align-middle">
                                Date:
                                <br />
                                <b>{event.formatteddate}</b>
                              </td>
                              <td className="text-center align-middle">
                                Cost:
                                <br />
                                <b>€&nbsp;{event.info}</b>
                              </td>
                              <td className="text-center align-middle">
                                <button className="btn btn-info py-1" onClick={() => fetchEventDetails(event.eventid, id)}>
                                  <i className="fa fa-info-circle mr-1"></i>
                                  <br />
                                  INFO
                                </button>
                              </td>
                            </tr>
                            {eventDetails[event.eventid] && (
                              <>
                                <tr className={`event_details_${event.eventid}`}>
                                  <td colSpan="7" className="text-center"></td>
                                </tr>
                                <tr className={`event_details_${event.eventid}`}>
                                  <td colSpan="7" className="break-all">
                                    <h5>
                                      Location: <b>{eventDetails[event.eventid].eventAddress}</b>
                                    </h5>
                                    <hr />
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: eventDetails[event.eventid].eventDescription,
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr className={`event_details_${event.eventid}`}>
                                  <td colSpan="7" className="text-center"></td>
                                </tr>
                                <tr className={`event_details_${event.eventid}`}>
                                  <td colSpan="7" className="break-all">
                                    <h5>
                                      Details:
                                    </h5>
                                    <hr />
                                    <table>
                                      <tbody>
                                        <tr className={`event_details_${event.eventid}`}>
                                          <td className="text-center align-middle">
                                            <i className="fa fa-users"></i>&nbsp;Max:
                                            <br />
                                            <b>{eventDetails[event.eventid].maxTickets}</b>
                                          </td>
                                          <td className="text-center align-middle">
                                            Starts:
                                            <br />
                                            <b>{eventDetails[event.eventid].eventTime}</b>
                                          </td>
                                          <td className="text-center align-middle">
                                            Ends:
                                            <br />
                                            <b>{eventDetails[event.eventid].eventEndTime}</b>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                
                              </>
                            )}
                          </tbody>
                        </table>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card collapse_section">
                  <h5
                    className={`card-header bg-dark text-light pointer collapse_title ${expandedSections.about ? "active" : ""}`}
                    data-toggle="collapse"
                    data-target="#about_table"
                    aria-expanded={expandedSections.about}
                    onClick={() => toggleSection("about")}
                  >
                    <i className="fa fa-lg mr-3"></i>
                    About {societyData?.name}
                  </h5>
                  <div className="collapse show" id="about_table">
                    <div className="card-body p-3">
                      <div>{societyData?.description}</div>

                      <div className="mb-n2"></div>
                    </div>
                    <div className="card-footer">
                      <div className="row">
                        <div className="col-12">
                          <a
                            className="mr-3"
                          >
                            University — {societyData?.uniname}
                          </a>
                        </div>
                        <div className="col-12">
                          <a
                            className="mr-3"
                          >
                            Category — {societyData?.club_type}
                          </a>
                        </div>
                        <div className="col-12">
                          <a
                            className="mr-3"
                          >
                            On Rubric since — {societyData?.society_created_date}
                          </a>
                        </div>                                                
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3 collapse_section">
                  <h5
                    className={`card-header bg-dark text-light pointer collapse_title ${expandedSections.committee ? "active" : ""}`}
                    data-toggle="collapse"
                    data-target="#committee_table"
                    aria-expanded={expandedSections.committee}
                    onClick={() => toggleSection("committee")}
                  >
                    <i className="fa fa-lg mr-3"></i>
                    Current Committee
                    <span className="float-right badge badge-light">
                      {societyData?.sections[3].array.length}
                    </span>
                  </h5>
                  <div
                    className="card-body p-0 collapse table-responsive"
                    id="committee_table"
                  >
                    <table className="table mb-0">
                      <tbody>
                        {societyData?.sections[3].array.map((member, index) => (
                          <tr key={index}>
                            <th>{member.subtitle}</th>
                            <td>{member.title.replace(/[0-9]/g, '').trim()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="clearfix"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;
