import React from "react";

const LandlordApplicationsPage = ({ applications, onBack }) => {
  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-semibold">
            Applications ({pendingApplications.length})
          </h1>
        </div>
      </div>

      {/* Applications List */}
      <div className="p-4 space-y-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={application.avatar}
                alt={application.applicantName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {application.applicantName}
                </h3>
                <p className="text-sm text-gray-600">
                  Applied for: {application.propertyTitle}
                </p>
                <p className="text-xs text-gray-500">
                  {application.applicationDate}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Accept
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandlordApplicationsPage;
