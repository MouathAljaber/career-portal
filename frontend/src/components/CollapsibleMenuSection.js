import { useState, useEffect, Fragment } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

/**
 * Professional Collapsible Menu Section
 * Groups related menu items with smooth expand/collapse animation
 */
const CollapsibleMenuSection = ({ 
  title, 
  icon: Icon, 
  items, 
  defaultOpen = false,
  onClick,
  activeItem = null 
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [userToggled, setUserToggled] = useState(false);

  // Auto-open if any item is active (but only if user hasn't manually toggled)
  const hasActiveItem = items.some(item => item.id === activeItem || item.label === activeItem);
  
  useEffect(() => {
    if (hasActiveItem && !open && !userToggled) {
      setOpen(true);
    }
  }, [activeItem, hasActiveItem, open, userToggled]);

  const handleHeaderClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserToggled(true);
    setOpen(!open);
  };

  const handleChevronClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserToggled(true);
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItem 
        onClick={handleHeaderClick}
        sx={{
          pl: 2,
          pr: 1.5,
          py: 1.2,
          my: 0.5,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: hasActiveItem ? '#e8f1fd' : 'transparent',
          borderLeft: hasActiveItem ? '3px solid #1e56d5' : '3px solid transparent',
          '&:hover': {
            backgroundColor: hasActiveItem ? '#dfe9fc' : '#eff1f7',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hasActiveItem ? '#1e56d5' : '#5b6785',
            flexShrink: 0,
            '&:hover': {
              color: '#1e56d5',
              transition: 'color 0.25s ease',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: hasActiveItem ? '#dbe7f5' : 'transparent',
              transition: 'all 0.25s ease',
              'ListItem:hover &': {
                backgroundColor: '#dbe7f5',
              }
            }}
          >
            <Icon fontSize="small" />
          </Box>
        </ListItemIcon>
        <ListItemText 
          primary={title} 
          primaryTypographyProps={{ 
            fontWeight: hasActiveItem ? 700 : 700,
            fontSize: '0.95rem',
            color: hasActiveItem ? '#1e56d5' : '#0f172a',
            letterSpacing: '0.3px',
          }}
          sx={{ ml: 0.5 }}
        />
        <IconButton 
          size="small" 
          onClick={handleChevronClick}
          onMouseDown={(e) => e.stopPropagation()}
          sx={{ 
            ml: 'auto',
            color: '#5b6785',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            '&:hover': {
              backgroundColor: 'rgba(30, 86, 213, 0.08)',
              color: '#1e56d5',
            }
          }}
        >
          <ExpandMore />
        </IconButton>
      </ListItem>

      <Collapse 
        in={open} 
        timeout="auto" 
        unmountOnExit
        sx={{
          '& .MuiCollapse-wrapperInner': {
            animation: open ? 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
        <List component="div" disablePadding sx={{ my: 0 }}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                if (item.onClick) item.onClick();
              }}
              sx={{
                pl: 2,
                pr: 1.5,
                py: 1,
                mx: 0.75,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: activeItem === item.id || activeItem === item.label ? '#e8f1fd' : 'transparent',
                borderLeft: activeItem === item.id || activeItem === item.label ? '3px solid #1e56d5' : '3px solid transparent',
                '&:hover': {
                  backgroundColor: activeItem === item.id || activeItem === item.label ? '#dfe9fc' : '#f8f9fc',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeItem === item.id || activeItem === item.label ? '#1e56d5' : '#9ca3af',
                  flexShrink: 0,
                  transition: 'color 0.25s ease',
                  '&:hover': {
                    color: '#1e56d5',
                  }
                }}
              >
                {item.icon && <item.icon fontSize="small" />}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{ 
                  fontSize: '0.9rem', 
                  fontWeight: activeItem === item.id || activeItem === item.label ? 600 : 500,
                  color: activeItem === item.id || activeItem === item.label ? '#1e56d5' : '#1f2937',
                  letterSpacing: '0.2px',
                }}
                sx={{ ml: 0.5 }}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default CollapsibleMenuSection;
