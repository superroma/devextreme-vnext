// Simplified transformation of legacy employees dataset to fields used in BasicGrid demo
export interface EmployeeRow {
  name: string
  position: string
  city: string
}

// A tiny subset for the demo (can be expanded later or generated)
export const employees: EmployeeRow[] = [
  { name: 'John Heart', position: 'CEO', city: 'Los Angeles' },
  { name: 'Olivia Peyton', position: 'Sales Assistant', city: 'Denver' },
  { name: 'Robert Reagan', position: 'CMO', city: 'Austin' },
  { name: 'Greta Sims', position: 'HR Manager', city: 'New York' },
  { name: 'Brett Wade', position: 'IT Manager', city: 'Chicago' },
  { name: 'Sandra Johnson', position: 'Controller', city: 'Las Vegas' },
  { name: 'Kevin Carter', position: 'Shipping Manager', city: 'Seattle' },
  { name: 'Cynthia Stanwick', position: 'HR Assistant', city: 'Boston' },
  { name: 'Kent Samuelson', position: 'Ombudsman', city: 'Dallas' },
  { name: 'Taylor Riley', position: 'Network Admin', city: 'Miami' },
  { name: 'Samantha Bright', position: 'Support Engineer', city: 'Phoenix' },
  { name: 'Arthur Miller', position: 'Account Manager', city: 'Portland' },
]
