import ProtectedRoute from "@/components/ProtectedRoute";

const AdminPanelLayout = ({ children }) => {
  return (
      <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
  );
};

export default AdminPanelLayout;