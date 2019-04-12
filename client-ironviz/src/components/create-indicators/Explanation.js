import React, { Component } from "react";

class Explanation extends Component {
  render() {
    return (
      <div className="Explanation">
        <div className="Explanation__HappyPlanetIndex">
          <p>
            The <strong>Happy Planet Index (HPI)</strong> measures what matters:
            sustainable wellbeing for all. It tells us how well nations are
            doing at achieving long, happy, sustainable lives. <br />
            HPI = (Wellbeing x Life expectancy x Inequality of outcomes) /
            Ecological Footprint <br />
            Index: from 0 to 100
          </p>
        </div>
        <div className="Explanation__HumanDevelomentIndex">
          <p>
            The <strong>Human Development Index (HDI)</strong> is a statistic
            composite index of life expectancy, education, and per capita income
            indicators, which are used to rank countries into four tiers of
            human development.
            <br />
            Index : from 0 to 1.
          </p>
        </div>
        <div className="Explanation__WorldHappinessReportScore">
          <p>
            The <strong>World Happiness Report Score</strong> is a ranking of
            national happiness based on respondent ratings of their own lives,
            which the report also correlates with various life factors.
            <br />
            Index : 0 to 10
          </p>
        </div>
        <div className="Explanation__WorldHappinessReportScore">
          <p>
            The
            <strong>Sustainable Economic Development Assessment (SEDA)</strong>
            is a diagnostic tool that gives countries insight into their overall
            social and economic conditions.
            <br />
            Index : 0 to 100
          </p>
        </div>
        <div className="Explanation__WomenMPs">
          <p>
            The
            <strong>Women in parliaments</strong>
            are the percentage of parliamentary seats in a single or lower
            chamber held by women.
            <br />
            Index : 0 to 100
          </p>
        </div>
      </div>
    );
  }
}

export default Explanation;
