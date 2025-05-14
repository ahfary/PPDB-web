"use client";
import Sidebar from "@/app/components/sidebar";
import WelcomeCard from "../../components/welcomeCard";
import RecruitmentTable from "../../components/requirementTable";
import CalendarCard from "../../components/calendarCard";
import ProfileCard from "../../components/profileCard";


const Dashboard = () => {
  return (
    <div className="flex bg-[#eff1fd] text-black">
      <Sidebar />
      <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <WelcomeCard />
          <RecruitmentTable />
        </div>
        <div className="space-y-6">
          <CalendarCard />
          <ProfileCard />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
