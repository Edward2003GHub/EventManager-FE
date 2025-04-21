import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListSubheader,
  Fade
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { searchAll } from "../utility/apiGetCalls";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ events: [], news: [], orgs: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 1) {
        searchAll(query).then((data) => {
          setResults(data);
        });
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleClick = (type, id) => {
    if (type === "event") navigate(localStorage.getItem('token') ? `/user/events/${id}` : `/events/${id}`);
    else if (type === "news") navigate(localStorage.getItem('token') ? `/user/news/${id}` : `/news/${id}`);
    else if (type === "org") navigate(localStorage.getItem('token') ? `/user/organizations/${id}` : `/organizations/${id}`);
    setShowDropdown(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for events, news, or organizations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 200);
            setIsFocused(false);
          }}
          onFocus={() => {
            if (query) setShowDropdown(true);
            setIsFocused(true);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ 
                  color: isFocused ? '#1976d2' : '#757575',
                  transition: 'color 0.3s ease'
                }} />
              </InputAdornment>
            ),
            style: {
              borderRadius: '28px',
              backgroundColor: isFocused ? '#fff' : 'rgba(255,255,255,0.9)',
              boxShadow: isFocused ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              height: '48px'
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isFocused ? '#1976d2' : 'rgba(0,0,0,0.1)',
                transition: 'border-color 0.3s ease'
              },
              '&:hover fieldset': {
                borderColor: isFocused ? '#1976d2' : 'rgba(0,0,0,0.2)',
              },
            },
            '& .MuiInputBase-input': {
              padding: '12px 14px',
              fontSize: '0.95rem'
            }
          }}
        />

        <Fade in={showDropdown}>
          <Paper 
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 1000,
              marginTop: '8px',
              maxHeight: '400px',
              overflow: 'auto',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }} 
            elevation={4}
          >
            {results.events.length > 0 && (
              <>
                <List subheader={<ListSubheader sx={{ bgcolor: 'background.paper' }}>Events</ListSubheader>}>
                  {results.events.map((event) => (
                    <ListItem
                      button
                      key={event.eventID}
                      onClick={() => handleClick("event", event.eventID)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <ListItemText 
                        primary={event.name} 
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}
            {results.news.length > 0 && (
              <>
                <List subheader={<ListSubheader sx={{ bgcolor: 'background.paper' }}>News</ListSubheader>}>
                  {results.news.map((news) => (
                    <ListItem
                      button
                      key={news.id}
                      onClick={() => handleClick("news", news.id)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)'
                        }
                      }}
                    >
                      <ListItemText 
                        primary={news.title} 
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}
            {results.orgs.length > 0 && (
              <List subheader={<ListSubheader sx={{ bgcolor: 'background.paper' }}>Organizations</ListSubheader>}>
                {results.orgs.map((org) => (
                  <ListItem
                    button
                    key={org.organizationID}
                    onClick={() => handleClick("org", org.organizationID)}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={org.name} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Fade>
      </div>
    </div>
  );
};

export default SearchBar;