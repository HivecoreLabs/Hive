import React, { useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function SupportStaffList({ savedMembers }) {
    // const {}

    useEffect(() => {

    }, [])
    return (
        <div>
            <h2>Saved Support Staff Members</h2>
            <List>
                {savedMembers.map((member, i) => (
                    <ListItem key={i}>
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
