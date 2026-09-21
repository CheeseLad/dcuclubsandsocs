import React from "react";
import { useEffect, useState } from "react";

const MY_SOCIETIES_STORAGE_KEY = "mySocieties";

const MySocieties = () => {
  const [societyList, setSocietyList] = useState([]);
  const [mySocieties, setMySocieties] = useState(() => {
    const storedSocieties = localStorage.getItem(MY_SOCIETIES_STORAGE_KEY);

    try {
      return JSON.parse(storedSocieties);
    } catch {
      return [];
    }
  });

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
      filterClubType: "",
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
      setSocietyList(data.results);
      return data;
    } catch (error) {
      console.error("Failed to fetch society landing page:", error);
    }
  }

  useEffect(() => {
    fetchSocietyList();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      MY_SOCIETIES_STORAGE_KEY,
      JSON.stringify(mySocieties),
    );
  }, [mySocieties]);

  const handleSocietyToggle = (societyId) => {
    setMySocieties((currentSocieties) =>
      currentSocieties.includes(societyId)
        ? currentSocieties.filter((id) => id !== societyId)
        : [...currentSocieties, societyId],
    );
  };

  const filteredSocieties = societyList.filter((society) =>
    mySocieties.includes(String(society.societyid)),
  );

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
              <h2>My Societies</h2>

              <div className="line-shape"></div>

              <div className="col-12 text-center">
                <h2 className="my-4">
                  <i>
                    <h4 className="card-title">
                      Your societies are saved in your browser
                    </h4>
                  </i>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="clearfix ">
        <div className="px-3 pb-5 h-100">
          <div className="container mb-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="mb-0">Select your societies</h3>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMySocieties([])}
                aria-label="Clear all selected societies"
                title="Clear all selected societies"
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div
              className="border rounded p-3"
              style={{ maxHeight: "260px", overflowY: "auto" }}
            >
              {societyList.map((society) => {
                const societyId = String(society.societyid);

                return (
                  <div className="form-check" key={societyId}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`society-${societyId}`}
                      checked={mySocieties.includes(societyId)}
                      onChange={() => handleSocietyToggle(societyId)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`society-${societyId}`}
                    >
                      {society.title || society.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row justify-content-center">
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
                    <img className="card-img-top" src={society.image} alt="" />
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
                        href={society.linkedinurl}
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
          <div className="clearfix"></div>
        </div>
      </section>
    </div>
  );
};

export default MySocieties;
