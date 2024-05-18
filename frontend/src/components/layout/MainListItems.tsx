import React from 'react';
import {Link, ListItemButton, ListItemIcon} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from "@mui/icons-material/Layers";
import ListItemText from "@mui/material/ListItemText";

interface MainListItemsProps {
    linkHref: string;
    linkText: string;
}

export const MainListItems: React.FC<MainListItemsProps> = ({ linkHref, linkText }) => (
    <React.Fragment>
        <ListItemButton LinkComponent={Link} href={linkHref}>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={linkText} />
        </ListItemButton>
    </React.Fragment>
);