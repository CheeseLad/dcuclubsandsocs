import { useEffect, useState } from "react";

const MY_SOCIETIES_STORAGE_KEY = "mySocieties";
const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseEventDate(event) {
  const dateText = event.date || event.startdate || event.formatteddate || "";
  const formattedDate = dateText.match(
    /\w+,\s+(\d{1,2})\s+(\w{3})\s+(\d{4}),\s+(\d{1,2})\.(\d{2})\s+(AM|PM)/i,
  );

  if (formattedDate) {
    const [, day, month, year, hour, minute, meridiem] = formattedDate;
    let hourNumber = Number(hour);

    if (meridiem.toUpperCase() === "PM" && hourNumber !== 12) {
      hourNumber += 12;
    }

    if (meridiem.toUpperCase() === "AM" && hourNumber === 12) {
      hourNumber = 0;
    }

    return new Date(
      Number(year),
      MONTHS[month.slice(0, 3)],
      Number(day),
      hourNumber,
      Number(minute),
    ).getTime();
  }

  const timestamp = Date.parse(dateText);
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
}

function isTodayOrLater(event) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parseEventDate(event) >= today.getTime();
}

const MyEvents = () => {
  const [mySocieties, setMySocieties] = useState(() => {
    try {
      const storedSocieties = localStorage.getItem(MY_SOCIETIES_STORAGE_KEY);
      const parsedSocieties = JSON.parse(storedSocieties);

      return Array.isArray(parsedSocieties) ? parsedSocieties : [];
    } catch {
      return [];
    }
  });
  const [societyData, setSocietyData] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    links: true,
    events: true,
    about: true,
    committee: false,
    merchandise: false,
    memberships: true,
  });
  const [expandedMerchandise, setExpandedMerchandise] = useState({});
  const merchandiseSection = societyData?.sections?.find(
    (section) => section.sectionname === "Merchandise",
  );

  const toggleMerchandiseInfo = (merchandiseId) => {
    setExpandedMerchandise((currentMerchandise) => ({
      ...currentMerchandise,
      [merchandiseId]: !currentMerchandise[merchandiseId],
    }));
  };

  const [expandedMemberships, setExpandedMemberships] = useState({});
  const membershipsSection = societyData?.sections?.find(
    (section) => section.sectionname === "Memberships",
  );

  const toggleMembershipInfo = (membershipId) => {
    setExpandedMemberships((currentMemberships) => ({
      ...currentMemberships,
      [membershipId]: !currentMemberships[membershipId],
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  };

  async function fetchSocietyLandingPage(societyId) {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      societyid: societyId,
      domain: "dcustudentlife.hellorubric.com",
      currentUrl: `https://dcustudentlife.hellorubric.com{societyId}`,
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
      return data;
    } catch (error) {
      console.error("Failed to fetch society landing page:", error);
    }
  }

  async function fetchEventDetails(eventId, societyId) {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      eventId: eventId.toString(),
      currentUrl: `https://dcustudentlife.hellorubric.com{societyId}`,
      device: "web_portal",
      version: 4,
      timestamp: Date.now(), // Dynamically uses the current exact time
    };

    // Build application/x-www-form-urlencoded format
    const formBody = new URLSearchParams({
      details: JSON.stringify(detailsPayload),
      endpoint:
        "https://appserver.getqpay.com:9090/AppServerSwapnil/event/details",
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
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    }
  }

  useEffect(() => {
    let isCurrent = true;

    Promise.all(
      mySocieties.map((societyId) => fetchSocietyLandingPage(societyId)),
    ).then((societies) => {
      if (!isCurrent) return;

      const loadedSocieties = societies.filter(Boolean);
      setSocietyData(loadedSocieties);
      document.title = "My Events | DCU Clubs & Socs";
    });

    return () => {
      isCurrent = false;
    };
  }, [mySocieties]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const parsedSocieties = JSON.parse(
          localStorage.getItem(MY_SOCIETIES_STORAGE_KEY),
        );

        setMySocieties(Array.isArray(parsedSocieties) ? parsedSocieties : []);
      } catch {
        setMySocieties([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const events = societyData
    .flatMap((society) =>
      (society.sections?.[0]?.array || [])
        .filter(isTodayOrLater)
        .map((event) => ({
          event,
          societyId: String(society.societyid),
          societyName: society.name,
          societyLogo: society.logo_uploaded,
        })),
    )
    .sort(
      ({ event: firstEvent }, { event: secondEvent }) =>
        parseEventDate(firstEvent) - parseEventDate(secondEvent),
    );

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
                <h2>My Events</h2>

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
                  <i>Events from your societies</i>
                </h2>
              </div>

              <i className="col-12 text-center mb-2 px-4">
                Add your societies to{" "}
                <a href="/mysocieties" className="text-success">
                  My Societies
                </a>{" "}
                to see their upcoming events here
              </i>
            </div>

            <div className="row pt-3">
              <div className="col-12">
                <div className="card mb-3 collapse_section" id="events">
                  <h5
                    className={`card-header bg-dark text-light pointer collapse_title ${expandedSections.events ? "active" : ""}`}
                    data-toggle="collapse"
                    data-target="#events_table"
                    aria-expanded={expandedSections.events}
                    onClick={() => toggleSection("events")}
                  >
                    <i className="fa fa-lg mr-3"></i>
                    Upcoming Event{events.length !== 1 ? "s" : ""}
                    <span className="float-right badge badge-light">
                      {events.length}
                    </span>
                  </h5>
                  <div
                    className="card-body p-0 collapse show"
                    id="events_table"
                  >
                    <div className="table-responsive">
                      {events.map(
                        (
                          { event, societyId, societyName, societyLogo },
                          index,
                        ) => (
                          <table
                            key={`${societyId}-${event.eventid ?? index}`}
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
                                  <a href={`/society/${societyId}`} className="lightbox">
                                    <img
                                      className="img-thumbnail"
                                      src={societyLogo}
                                      alt={`${societyName} logo`}
                                      style={{ width: "150px" }}
                                    />
                                  </a>
                                </td>
                                <th colSpan="7" className="h5 align-middle">
                                  <i className="fa fa-calendar-day mr-3"></i>
                                  {event.title}{" "}
                                  <small className="d-block text-muted">
                                    {societyName}
                                  </small>
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
                                  <button
                                    className="btn btn-info py-1"
                                    onClick={() =>
                                      fetchEventDetails(
                                        event.eventid,
                                        societyId,
                                      )
                                    }
                                  >
                                    <i className="fa fa-info-circle mr-1"></i>
                                    <br />
                                    INFO
                                  </button>
                                </td>

                                                                                              <td className="text-left align-middle">
                                  <a
                                    href={`https://dcustudentlife.hellorubric.com/?s=${societyId}&eid=${event.eventid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <button className="btn btn-success py-1">
                                      <i className="fa fa-link mr-1"></i>
                                      <br />
                                      Rubric
                                    </button>
                                  </a>
                                </td>
                              </tr>
                              {eventDetails[event.eventid] && (
                                <>
                                  <tr
                                    className={`event_details_${event.eventid}`}
                                  >
                                    <td
                                      colSpan="7"
                                      className="text-center"
                                    ></td>
                                  </tr>
                                  <tr
                                    className={`event_details_${event.eventid}`}
                                  >
                                    <td colSpan="7" className="break-all">
                                      <h5>
                                        Location:{" "}
                                        <b>
                                          {
                                            eventDetails[event.eventid]
                                              .eventAddress
                                          }
                                        </b>
                                      </h5>
                                      <hr />
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            eventDetails[event.eventid]
                                              .eventDescription,
                                        }}
                                      />
                                    </td>
                                  </tr>
                                  <tr
                                    className={`event_details_${event.eventid}`}
                                  >
                                    <td
                                      colSpan="7"
                                      className="text-center"
                                    ></td>
                                  </tr>
                                  <tr
                                    className={`event_details_${event.eventid}`}
                                  >
                                    <td colSpan="7" className="break-all">
                                      <h5>Details:</h5>
                                      <hr />
                                      <table>
                                        <tbody>
                                          <tr
                                            className={`event_details_${event.eventid}`}
                                          >
                                            <td className="text-center align-middle">
                                              <i className="fa fa-users"></i>
                                              &nbsp;Max:
                                              <br />
                                              <b>
                                                {
                                                  eventDetails[event.eventid]
                                                    .maxTickets
                                                }
                                              </b>
                                            </td>
                                            <td className="text-center align-middle">
                                              Starts:
                                              <br />
                                              <b>
                                                {
                                                  eventDetails[event.eventid]
                                                    .eventTime
                                                }
                                              </b>
                                            </td>
                                            <td className="text-center align-middle">
                                              Ends:
                                              <br />
                                              <b>
                                                {
                                                  eventDetails[event.eventid]
                                                    .eventEndTime
                                                }
                                              </b>
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
                        ),
                      )}
                    </div>
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

export default MyEvents;
