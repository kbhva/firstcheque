import JobCard from "@/components/jobCard/JobCard";
import NavBar from "@/components/navigation/NavBar";
import { TechJobs } from "@/data/TechJobs";
import { DesignJobs } from "@/data/DesignJobs";
import { MarketingJobs } from "@/data/MarketingJobs";
import { WritingJobs } from "@/data/WritingJobs";
import Footer from "@/components/navigation/Footer";

const paramJobNameMapping = {
  tech: "Tech",
  design: "Design",
  marketing: "Marketing",
  writing: "Writing",
};

export default function Page({ params }: { params: { dept: string } }) {
  const renderJobs = (
    jobs: {
      title: string;
      skills: string;
      employer: string;
      description: string;
    }[]
  ) => (
    <>
      {jobs.length === 0 ? (
        <p>No jobs available for this department.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-[60%] mx-auto">
          <h1 className="col-span-3 text-5xl font-bold text-center m-8">
          Jobs in {paramJobNameMapping[params.dept as keyof typeof paramJobNameMapping]}
          </h1>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              skills={job.skills}
              employer={job.employer}
              description={job.description}
              shadow={false}
            />
          ))}
        </div>
      )}
    </>
  );

  return (
    <main className="">
      <NavBar />
      {params.dept === "tech" && renderJobs(TechJobs)}
      {params.dept === "design" && renderJobs(DesignJobs)}
      {params.dept === "marketing" && renderJobs(MarketingJobs)}
      {params.dept === "writing" && renderJobs(WritingJobs)}
      <Footer />
    </main>
  );
}
