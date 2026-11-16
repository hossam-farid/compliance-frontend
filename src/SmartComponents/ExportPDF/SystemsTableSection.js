import React from 'react';
import PropTypes from 'prop-types';
import { t_global_background_color_secondary_default } from '@patternfly/react-tokens';
import { Content } from '@patternfly/react-core';

const SystemsTableSection = ({ sectionTitle, systemsData, styles }) => {
  const commonTableConfig = {
    headers: [
      { value: 'Name' },
      { value: 'OS' },
      { value: 'Failed rules' },
      { value: 'Compliance score' },
    ],
    rowBuilder: (system, isOddRow) => {
      const osMajorVersion = `${system.os_major_version}.${system.os_minor_version}`;
      const customStyle = {
        backgroundColor: t_global_background_color_secondary_default.value,
        position: 'relative',
      };
      return (
        <tr
          className="pf-v6-c-table__tr"
          key={`${system.id}`}
          style={isOddRow ? customStyle : {}}
        >
          <td
            className="pf-v6-c-table__td pf-m-no-padding"
            style={styles.row}
            key={system.display_name}
          >
            {system.display_name}
          </td>
          <td
            className="pf-v6-c-table__td"
            style={styles.row}
            key={osMajorVersion}
          >
            RHEL {osMajorVersion}
          </td>
          <td
            className="pf-v6-c-table__td"
            style={styles.row}
            key={system.failed_rule_count}
          >
            {system.failed_rule_count}
          </td>
          <td
            className="pf-v6-c-table__td"
            style={styles.row}
            key={system.score}
          >
            {system.score}%
          </td>
        </tr>
      );
    },
  };

  const tableConfigurations = {
    'Compliant systems': commonTableConfig,
    'Non-compliant systems': commonTableConfig,
    'Systems with unsupported configuration': {
      headers: [
        { value: 'Name' },
        { value: 'OS' },
        { value: 'Current SSG' },
        { value: 'Expected SSG' },
      ],
      rowBuilder: (system, isOddRow) => {
        const osMajorVersion = `${system.os_major_version}.${system.os_minor_version}`;
        const customStyle = {
          backgroundColor: t_global_background_color_secondary_default.value,
          position: 'relative',
        };
        return (
          <tr
            className="pf-v6-c-table__tr"
            key={`${system.id}`}
            style={isOddRow ? customStyle : {}}
          >
            <td
              className="pf-v6-c-table__td pf-m-no-padding"
              style={styles.row}
              key={system.display_name}
            >
              {system.display_name}
            </td>
            <td
              className="pf-v6-c-table__td"
              style={styles.row}
              key={osMajorVersion}
            >
              RHEL {osMajorVersion}
            </td>
            <td
              className="pf-v6-c-table__td"
              style={styles.row}
              key={system.security_guide_version || 'N/A'}
            >
              {system.security_guide_version || 'N/A'}
            </td>
            <td
              className="pf-v6-c-table__td"
              style={styles.row}
              key={system.expected_security_guide_version || 'N/A'}
            >
              {system.expected_security_guide_version || 'N/A'}
            </td>
          </tr>
        );
      },
    },
    'Systems never reported': {
      headers: [{ value: 'Name' }, { value: 'OS' }],
      rowBuilder: (system, isOddRow) => {
        const osMajorVersion = `${system.os_major_version}.${system.os_minor_version}`;
        const customStyle = {
          backgroundColor: t_global_background_color_secondary_default.value,
          position: 'relative',
        };
        return (
          <tr
            className="pf-v6-c-table__tr"
            key={`${system.id}`}
            style={isOddRow ? customStyle : {}}
          >
            <td
              className="pf-v6-c-table__td pf-m-no-padding"
              style={styles.row}
              key={system.display_name}
            >
              {system.display_name}
            </td>
            <td
              className="pf-v6-c-table__td"
              style={styles.row}
              key={osMajorVersion}
            >
              RHEL {osMajorVersion}
            </td>
          </tr>
        );
      },
    },
  };

  const currentConfig = tableConfigurations[sectionTitle];

  const { headers } = currentConfig;
  const { rowBuilder } = currentConfig;

  const rows = systemsData.map((system, idx) => {
    const isOddRow = (idx + 1) % 2;
    return rowBuilder(system, isOddRow);
  });

  // Plain elements with PatternFly's class names: a PDF is never interactive,
  // so it keeps the styling without the hooks PatternFly runs for every cell.
  return (
    <React.Fragment>
      <Content style={styles.sectionHeader}>{sectionTitle}</Content>
      <table
        role="grid"
        className="pf-v6-c-table pf-m-grid-md pf-m-no-border-rows"
        style={{ width: '100%' }}
      >
        <thead className="pf-v6-c-table__thead">
          <tr className="pf-v6-c-table__tr">
            {headers.map((colHeader, index) => (
              <th
                scope="col"
                className="pf-v6-c-table__th"
                style={styles.noWrapHeader}
                key={`header-${index}`}
              >
                {colHeader.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup" className="pf-v6-c-table__tbody">
          {rows}
        </tbody>
      </table>
    </React.Fragment>
  );
};

SystemsTableSection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  systemsData: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired,
};

export default SystemsTableSection;
