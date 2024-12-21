import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical, Home, Users, Calendar, MessageSquare, CreditCard, Settings , Download, ImageOff, Search} from 'lucide-react';
import profileImage from './assets/profile.png';

const bloodPressureData = [
  { month: 'Oct 2023', systolic: 120, diastolic: 110 },
  { month: 'Nov 2023', systolic: 115, diastolic: 65 },
  { month: 'Dec 2023', systolic: 160, diastolic: 110 },
  { month: 'Jan 2024', systolic: 110, diastolic: 90 },
  { month: 'Feb 2024', systolic: 150, diastolic: 70 },
  { month: 'Mar 2024', systolic: 160, diastolic: 80 },
];

const Header = () => (
  <div className="h-16 bg-white border-b border-gray-100 flex items-center px-4">
    {/* Logo */}
    <div className="flex items-center w-72 px-4">
      <div className="text-xl font-bold flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded flex items-center justify-center text-white mr-2">
          T
        </div>
        <span className="text-gray-800">Tech<span className="text-teal-600">.Care</span></span>
      </div>
    </div>
    
    {/* Navigation */}
    <div className="flex-1 flex items-center justify-center space-x-1">
      <NavItem icon={<Home size={18} />} label="Overview" />
      <NavItem icon={<Users size={18} />} label="Patients" active />
      <NavItem icon={<Calendar size={18} />} label="Schedule" />
      <NavItem icon={<MessageSquare size={18} />} label="Message" />
      <NavItem icon={<CreditCard size={18} />} label="Transactions" />
    </div>
    
    {/* User Profile */}
    <div className="flex items-center space-x-6 px-4">
      <div className="flex items-center">
      <img src={profileImage} alt="Profile" className="w-8 h-8 bg-gray-200 rounded-full mr-2" />

        <div>
          <div className="text-sm font-medium">Dr. Jose Simmons</div>
          <div className="text-xs text-gray-500">General Practitioner</div>
        </div>
      </div>
      <Settings size={20} className="text-gray-400 cursor-pointer" />
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={20} />
      </button>
    </div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <button
    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors
      ${active 
        ? 'bg-teal-50 text-teal-600' 
        : 'text-gray-600 hover:bg-gray-50'
      }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const PatientCard = ({ patient, isActive }) => (
  <div className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors ${isActive ? 'bg-teal-50' : ''}`}>
    <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
    <div className="ml-3 flex-grow">
      <div className="font-medium text-sm">{patient.name}</div>
      <div className="text-xs text-gray-500">{`${patient.gender}, ${patient.age}`}</div>
    </div>
    <button className="text-gray-400 hover:text-gray-600">
      <MoreVertical size={16} />
    </button>
  </div>
);

const VitalCard = ({ icon, title, value, status, trend }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <div className="flex items-center mb-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span className="text-gray-600 text-sm ml-2">{title}</span>
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className={`text-sm flex items-center ${
      status === 'Normal' ? 'text-green-600' : 
      status === 'Higher than Average' ? 'text-red-600' :
      'text-blue-600'
    }`}>
      {status}
      {trend && <span className="ml-1">{trend}</span>}
    </div>
  </div>
);

const DiagnosticItem = ({ diagnosis, description, status }) => (
  <div className="border-b border-gray-100 py-3 last:border-0">
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium text-sm">{diagnosis}</div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'Cured' ? 'bg-green-50 text-green-700' :
        status === 'Inactive' ? 'bg-gray-50 text-gray-700' :
        'bg-yellow-50 text-yellow-700'
      }`}>
        {status}
      </div>
    </div>
  </div>
);

const LabResultItem = ({ title }) => (
  <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2">
    <span className="text-sm">{title}</span>
    <button className="text-gray-400 hover:text-gray-600">
      <Download size={16} />
    </button>
  </div>
);

const BloodPressureChart = () => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={bloodPressureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey="month" 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: '#6B7280' }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="systolic"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="diastolic"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ fill: '#10B981', strokeWidth: 2 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Left Sidebar - Patient List */}
<div className="w-72 bg-white border-r border-gray-100 h-[calc(100vh-64px)] overflow-y-auto">
  <div className="p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Patients</h2>
      <div className="relative">
        {/* Search Icon */}
        <button className="text-teal-500 focus:outline-none">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="space-y-1">
      {[
        { name: 'Emily Williams', gender: 'Female', age: 18 },
        { name: 'Ryan Johnson', gender: 'Male', age: 45 },
        { name: 'Brandon Mitchell', gender: 'Male', age: 36 },
        { name: 'Jessica Taylor', gender: 'Female', age: 28 },
        { name: 'Samantha Johnson', gender: 'Female', age: 56 },
        // Add more patients...
      ].map((patient, index) => (
        <PatientCard
          key={index}
          patient={patient}
          isActive={patient.name === 'Jessica Taylor'}
        />
      ))}
    </div>
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Diagnosis History</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Blood Pressure</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                      <span className="text-sm text-gray-600">Systolic</span>
                      <span className="ml-2 text-sm font-semibold">160</span>
                      <span className="ml-1 text-xs text-red-500">Higher than Average</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                      <span className="text-sm text-gray-600">Diastolic</span>
                      <span className="ml-2 text-sm font-semibold">78</span>
                      <span className="ml-1 text-xs text-blue-500">Lower than Average</span>
                    </div>
                  </div>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500">
                  <option>Last 6 months</option>
                </select>
              </div>
              <BloodPressureChart />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <VitalCard
              icon={<span className="text-2xl">🫁</span>}
              title="Respiratory Rate"
              value="20 bpm"
              status="Normal"
            />
            <VitalCard
              icon={<span className="text-2xl">🌡️</span>}
              title="Temperature"
              value="98.6°F"
              status="Normal"
            />
            <VitalCard
              icon={<span className="text-2xl">❤️</span>}
              title="Heart Rate"
              value="78 bpm"
              status="Lower than Average"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Diagnostic List</h2>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <DiagnosticItem
                  diagnosis="Hypertension"
                  description="Chronic high blood pressure"
                  status="Under Observation"
                />
                <DiagnosticItem
                  diagnosis="Type 2 Diabetes"
                  description="Insulin resistance and elevated blood sugar"
                  status="Cured"
                />
                <DiagnosticItem
                  diagnosis="Asthma"
                  description="Recurrent episodes of bronchial constriction"
                  status="Inactive"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Lab Results</h2>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <LabResultItem title="Blood Tests" />
                <LabResultItem title="CT Scans" />
                <LabResultItem title="Radiology Reports" />
                <LabResultItem title="X-Rays" />
                <LabResultItem title="Urine Test" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Patient Info */}
        <div className="w-80 bg-white border-l border-gray-100 p-6 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="text-center mb-6">
          <img src={profileImage} alt="Profile" className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4" />
            <h2 className="text-xl font-bold">Jessica Taylor</h2>
          </div>

          <div className="space-y-4">
            <InfoItem label="Date Of Birth" value="August 23, 1996" />
            <InfoItem label="Gender" value="Female" />
            <InfoItem label="Contact Info" value="(415) 555-1234" />
            <InfoItem label="Emergency Contacts" value="(415) 555-5678" />
            <InfoItem label="Insurance Provider" value="Sunrise Health Assurance" />
            <button className="w-full mt-6 bg-teal-500 text-white rounded-lg py-2 hover:bg-teal-600 transition-colors">
              Show All Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default Dashboard;