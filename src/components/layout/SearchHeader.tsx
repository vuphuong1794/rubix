import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Button, IconButton, Input, Popover } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const SearchHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const navigate = useRouter();

  const { search } = navigate.query;

  const [searchPro, setSearchPro] = React.useState(search);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate.push({
      pathname: '/collections/all',
      query: { search: searchPro },
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick} id={id}>
        <SearchOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchPro(e.target.value)
        }
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Input
          id='input-with-icon-adornment'
          placeholder='Search...'
          defaultValue={searchPro}
          className='h-14 w-72'
          sx={{
            padding: '0 0.5rem',
          }}
          endAdornment={
            <Button aria-label='search' onClick={handleClose}>
              <SendIcon />
            </Button>
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleClose()
          }
        />
      </Popover>
    </div>
  );
};
export default SearchHeader;
