import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(to right, #f0f4f8, #e2ebf0)",
        minHeight: "100vh",
      }}
    >
      <h2
        className="text-center mb-5"
        style={{
          fontWeight: "700",
          color: "#007bff",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        My Profile
      </h2>

      <div className="row justify-content-center">
        {/* Avatar Card */}
        <div className="col-12 col-md-4 mb-4">
          <div
            className="text-center p-4 rounded shadow-sm"
            style={{
              background: "#ffffff",
              border: "1px solid #ddd",
              transition: "transform 0.3s",
            }}
          >
            <figure className="avatar avatar-profile mb-3">
              <img
                className="rounded-circle img-fluid"
                src={user.avatar ?? "./images/default_avatar.png"}
                alt={user.name}
                style={{
                  width: "260px",
                  height: "260px",
                  objectFit: "cover",
                  border: "4px solid #007bff",
                  padding: "4px",
                }}
              />
            </figure>

            <Link
              to="/myprofile/update"
              className="btn btn-primary btn-block mt-3"
              style={{
                fontWeight: "600",
                borderRadius: "12px",
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* User Info Card */}
        <div className="col-12 col-md-6">
          <div
            className="p-4 rounded shadow-sm"
            style={{
              background: "#ffffff",
              border: "1px solid #ddd",
              transition: "transform 0.3s",
            }}
          >
            <h4 className="fw-bold mb-3" style={{ color: "#333" }}>
              Full Name
            </h4>
            <p className="text-secondary fs-5">{user.name}</p>

            <h4 className="fw-bold mt-4 mb-3" style={{ color: "#333" }}>
              Email Address
            </h4>
            <p className="text-secondary fs-5">{user.email}</p>

            <div className="d-grid gap-3 mt-5">
              <Link
                to="/orders"
                className="btn btn-danger btn-block"
                style={{
                  fontWeight: "600",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s",
                }}
              >
                <i className="fa fa-shopping-bag me-2"></i> My Orders
              </Link>

              <Link
                to="/myprofile/update/password"
                className="btn btn-primary btn-block"
                style={{
                  fontWeight: "600",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s",
                }}
              >
                <i className="fa fa-lock me-2"></i> Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
