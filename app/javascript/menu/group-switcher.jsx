import Dropdown from 'carbon-components-react/es/components/Dropdown';
import React from 'react';
import SideNavItem from 'carbon-components-react/es/components/UIShell/SideNavItem';
import { Collaborate20 } from '@carbon/icons-react';

const { miqChangeGroup } = window;

export const GroupSwitcher = ({ miqGroups, currentGroup, expanded: isExpanded }) => {
  const options = miqGroups.map(({ id, description }) => ({
    label: description,
    value: id,
  }));

  const currentOption = {
    label: currentGroup.description,
    value: currentGroup.id,
  };

  const groupChange = ({ selectedItem: { value: group_id } }) => {
    if (group_id && group_id !== currentGroup.id) {
      miqChangeGroup(group_id);
    }
  };

  const collapsed = (
    <SideNavItem className="padded vertical-center">
      <Collaborate20 />
    </SideNavItem>
  );

  const singleGroup = (
    <SideNavItem className="padded vertical-center">
      {currentOption.label}
    </SideNavItem>
  );

  const multiGroup = (
    <Dropdown
      ariaLabel={__("Change current group")}
      id='miq-nav-group-switch-dropdown'
      initialSelectedItem={currentOption}
      items={options}
      label={__("Change current group")}
      onChange={groupChange}
    />
  );

  const expanded = options.length > 1 ? multiGroup : singleGroup;

  return (
    <div
      className="menu-group"
      title={`${__("Current group:")} ${currentOption.label}`}
    >
      { isExpanded ? expanded : collapsed }
    </div>
  );
};
