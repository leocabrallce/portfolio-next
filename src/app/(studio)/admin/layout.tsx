export const metadata = {
  title: 'Admin',
  description: 'Portfolio Admin section',
};

type Props = Readonly<{ children: React.ReactNode; }>;

// This component is for organization purposes only
// If any HTML should be added / changed in Sanity Admin, it should be done here
export default function RootAdminLayout({ children }: Props) {
  return (children);
}
