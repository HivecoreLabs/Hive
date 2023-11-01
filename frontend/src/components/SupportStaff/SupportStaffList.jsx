import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function SupportStaffList({ savedMembers }) {
    return (
        <div>
            <h2>Saved Support Staff Members</h2>
            <List>
                {savedMembers.map((member) => (
                    <ListItem key={member.id}>
                        <ListItemText
                            primary={`${member.employee} - ${member.role}`}
                            secondary={`Time In: ${member.timeIn}, Time Out: ${member.timeOut}, Double Shift: ${member.isDoubleShift ? 'Yes' : 'No'}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default SupportStaffList;
