import React from 'react';
import PropTypes from 'prop-types';
import {
  t_global_background_color_secondary_default,
  t_global_font_size_sm,
} from '@patternfly/react-tokens';
import { Content } from '@patternfly/react-core';
import { capitalizeWord, stringToSentenceCase } from '@/Utilities/helpers';

const TopFailedRulesSection = ({ rulesData, styles }) => {
  // Plain elements with PatternFly's class names: a PDF is never interactive,
  // so it keeps the styling without the hooks PatternFly runs for every cell.
  return (
    <React.Fragment>
      <Content style={styles.sectionHeader}>Top failed rules</Content>
      <table
        role="grid"
        className="pf-v6-c-table pf-m-grid-md pf-m-no-border-rows"
        style={{ width: '100%' }}
      >
        <thead className="pf-v6-c-table__thead">
          <tr className="pf-v6-c-table__tr">
            <th
              scope="col"
              className="pf-v6-c-table__th pf-m-fit-content"
              style={styles.header}
            >
              ID
            </th>
            <th scope="col" className="pf-v6-c-table__th" style={styles.header}>
              Name
            </th>
            <th
              scope="col"
              className="pf-v6-c-table__th pf-m-fit-content"
              style={styles.header}
            >
              Severity
            </th>
            <th
              scope="col"
              className="pf-v6-c-table__th pf-m-nowrap"
              style={styles.header}
            >
              Failed systems
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className="pf-v6-c-table__tbody">
          {rulesData.map((item, index) => (
            <tr
              className="pf-v6-c-table__tr"
              key={`rule-row-${index}`}
              style={{
                backgroundColor:
                  (index + 1) % 2 &&
                  t_global_background_color_secondary_default.value,
                position: (index + 1) % 2 ? 'relative' : undefined,
                fontSize: t_global_font_size_sm.value,
              }}
            >
              <td className="pf-v6-c-table__td" style={styles.noWrapRow}>
                {item.identifier?.label || '--'}
              </td>
              <td className="pf-v6-c-table__td" style={styles.row}>
                {stringToSentenceCase(item.title)}
              </td>
              <td className="pf-v6-c-table__td" style={styles.row}>
                {capitalizeWord(item.severity)}
              </td>
              <td className="pf-v6-c-table__td" style={styles.row}>
                {item.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

TopFailedRulesSection.propTypes = {
  rulesData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      identifier: PropTypes.object,
      severity: PropTypes.string,
      count: PropTypes.number,
    }),
  ).isRequired,
  styles: PropTypes.object.isRequired,
};

export default TopFailedRulesSection;
