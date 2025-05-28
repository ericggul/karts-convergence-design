import { useRouter } from 'next/router';
import Head from 'next/head';
// import { motion } from 'framer-motion'; // No longer needed here for loading state
import { PROJECTS } from '../../utils/constant/dummy';
import ProjectDetail from '../../components/pages/ProjectDetail';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Animation variants for the loading state - REMOVED
// const loadingStateVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

export default function ProjectPage({ project, projectNumber }) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return (
      <div // Changed back to plain div, or keep motion.div without variants if preferred for structure
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh'
        }}
        // variants={loadingStateVariants} // REMOVED
        // initial="hidden" // REMOVED
        // animate="visible" // REMOVED
        // exit="exit" // REMOVED
        // transition={{ duration: 0.3 }} // REMOVED
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} - K-Arts Convergence Design Archive</title>
        <meta 
          name="description" 
          content={`${project.title} by ${project.name} - Portfolio project from K-Arts Convergence Design Archive`} 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <ProjectDetail project={project} projectNumber={projectNumber} />
    </>
  );
}

// Generate static paths for all projects
export async function getStaticPaths() {
  const paths = PROJECTS.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

// Get static props for each project
export async function getStaticProps({ params }) {
  const projectId = parseInt(params.id);
  const project = PROJECTS.find(p => p.id === projectId);
  const projectIndex = PROJECTS.findIndex(p => p.id === projectId);

  if (!project) {
    return {
      notFound: true,
    };
  }

  const projectNumber = (projectIndex + 1).toString().padStart(2, '0');

  return {
    props: {
      project,
      projectNumber,
    },
    revalidate: 60,
  };
} 