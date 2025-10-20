import { alpha, styled } from '@mui/material/styles';
import { Switch, FormControlLabel } from "@mui/material";

export const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'var(--primary)',
    '&:hover': {
      backgroundColor: alpha('#006e2c', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'var(--primary)',
  },
}));

const Switches = ({ switches }) => (
  <div style={{ marginLeft: '50px' }}>
    {switches.map(({ label, checked, onChange }) => (
      <FormControlLabel
        key={label}
        control={
          <GreenSwitch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            size="small"
          />
        }
        label={label}
      />
    ))}
  </div>
);

export default Switches;