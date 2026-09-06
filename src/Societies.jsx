import React from "react";
import { useEffect, useState } from "react";

const Societies = () => {
  const [societyList, setSocietyList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchSocietyList() {
    const url = "https://api.hellorubric.com/";

    // Organize the internal JSON details object
    const detailsPayload = {
      firstCall: true,
      sortType: "itemName",
      desiredType: "societies",
      state: "Leinster",
      country: "IE",
      universityid: 541,
      limit: 1000,
      offset: 0,
      sortDirection: "asc",
      searchQuery: "",
      eventsPeriodFilter: "All",
      domain: "dcustudentlife.hellorubric.com",
      currentUrl: `https://dcustudentlife.hellorubric.com/search?type=societies&country=IE&state=Leinster&universityid=541`,
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
      //console.log("Society List Received:", data.results);
      setSocietyList(data.results);
      return data;
    } catch (error) {
      console.error("Failed to fetch society landing page:", error);
    }
  }

  useEffect(() => {
    fetchSocietyList();
  }, []);

  const filteredSocieties = societyList.filter((society) => {
    const query = searchQuery.trim().toLowerCase();

    return [society.title, society.name]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });

  return (
    <div
      id="pagemain"
      className="bg-white "
      style={{
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 20px 30px -20px",
        //marginBottom: "516.4px",
      }}
    >
      <div id="pagecover"></div>

      <section className="main_top clearfix" id="home"></section>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center pt-5">
              <h2>Societies</h2>

              <div className="line-shape"></div>
            </div>
          </div>
        </div>
      </div>

      <section className="clearfix ">
        <div className="px-3 pb-5 h-100">
          <div className="alert alert-dark text-center pb-0 pt-2 mb-5">
            <h5>Search Societies</h5>

            <div className="contact_from">
              <form
                method="post"
                id="contact-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="contact_input_area">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                      <div className="form-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          name="search"
                          id="societySearchInput"
                          placeholder="Search societies..."
                          value={searchQuery}
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          aria-label="Search societies"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <button
              type="button"
              className="filter_cs btn btn-dark btn-sm mb-2 ml-3"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </button>
          </div>
          <div className="row">
            {/*<div className="col-12 mb-5 mt-0 app-download-area">
              <div className="app-download-btn active">
                <a href="https://web.archive.org/web/20260312171416/https://dcuclubsandsocs.ie/societies">
                  <i className="fa fa-th"></i>
                  <p className="mb-0">
                    <span>view as</span> GRID
                  </p>
                </a>
              </div>
              <div className="app-download-btn">
                <a href="https://web.archive.org/web/20260312171416/https://dcuclubsandsocs.ie/societies/list">
                  <i className="fa fa-list-ul"></i>
                  <p className="mb-0">
                    <span>view as</span> LIST
                  </p>
                </a>
              </div>
              <div className="ml-auto app-download-btn">
                <a href="https://web.archive.org/web/20260312171416/https://dcuclubsandsocs.ie/clubs">
                  <i className="fa fa-th"></i>
                  <p className="mb-0">
                    <span>view</span> CLUBS
                  </p>
                </a>
              </div>
            </div>

            <div className="alert alert-dark text-center pb-0 pt-2 mb-5">
              <h5>Filter by Societies Type</h5>
              <button
                className="filter_cs btn btn-light btn-dark mb-2"
                data-type="ALL"
              >
                ALL (
                <span className="filter_count" data-type="ALL" data-val="92">
                  92
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="201">
                Academic (
                <span className="filter_count" data-type="201" data-val="21">
                  21
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="208">
                Charitable (
                <span className="filter_count" data-type="208" data-val="3">
                  3
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="204">
                Civic/Social/Cultural (
                <span className="filter_count" data-type="204" data-val="20">
                  20
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="205">
                Faith (
                <span className="filter_count" data-type="205" data-val="5">
                  5
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="206">
                Interest/Hobby (
                <span className="filter_count" data-type="206" data-val="26">
                  26
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="207">
                Lifestyle (
                <span className="filter_count" data-type="207" data-val="4">
                  4
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="203">
                Performance (
                <span className="filter_count" data-type="203" data-val="9">
                  9
                </span>
                )
              </button>
              <button className="filter_cs btn btn-light mb-2" data-type="202">
                Political (
                <span className="filter_count" data-type="202" data-val="4">
                  4
                </span>
                )
              </button>
              <button
                className="filter_cs btn btn-dark btn-warning btn-sm mb-2 ml-3"
                data-type="ALL"
              >
                reset types
              </button>
            </div>

            <h3
              id="filter_no_match"
              className="alert alert-warning text-center mb-5 py-5 d-none"
            >
              No matches found, try resetting the filter above
            </h3>*/}

            <div className="row justify-content-center px-3">
              {filteredSocieties.map((society) => (
                <div
                  className={`cs_profile col-12 col-sm-6 col-lg-4 ${
                    filteredSocieties.length === 1 ? "col-xl-12" : "col-xl-3"
                  } mb-4`}
                  data-type="204"
                  key={society.societyid}
                >
                  <div className="card">
                    <a href={`/society/${society.societyid}`}>
                      <div className="card-header text-center pb-0">
                        <h3 className="card-title">{society.title}</h3>
                      </div>
                    </a>

                    <a
                      className="card-img-container"
                      href={`/society/${society.societyid}`}
                    >
                      <img
                        className="card-img-top"
                        src={society.image}
                        alt=""
                      />
                    </a>

                    <a href={`/society/${society.societyid}`}>
                      <div className="card-body px-2 pb-2 text-center">
                        <h4></h4>
                        <p className="card-text">
                          <em>{society.name}</em>
                        </p>
                      </div>
                    </a>
                    <div className="card-footer text-center">
                      {society.instagramurl && (
                        <a
                          href={society.instagramurl}
                          className="text-dark"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="fab fa-instagram fa-2x fa-fw"></i>
                        </a>
                      )}

                      {society.discordurl && (
                        <a
                          href={society.discordurl}
                          className="text-dark"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="fab fa-discord fa-2x fa-fw"></i>
                        </a>
                      )}

                      {society.facebookurl && (
                        <a
                          href={society.facebookurl}
                          className="text-dark"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="fab fa-facebook fa-2x fa-fw"></i>
                        </a>
                      )}

                      {society.tiktokurl && (
                        <a
                          href={society.tiktokurl}
                          className="text-dark"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="fab fa-tiktok fa-2x fa-fw"></i>
                        </a>
                      )}

                      {society.linkedinurl && (
                        <a
                          href={society.linkedInurl}
                          className="text-dark"
                          target="_blank"
                          rel="noopener"
                        >
                          <i className="fab fa-linkedin fa-2x fa-fw"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </section>
    </div>
  );
};

export default Societies;
