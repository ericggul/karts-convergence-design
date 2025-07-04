import { useRouter } from 'next/router';
import Head from 'next/head';
import { PROJECTS } from '../../utils/constant/dummy';
import ProjectDetail from '../../components/pages/ProjectDetail';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ProjectPage({ project, projectNumber }) {
  const router = useRouter();

  // Handle loading state
  if (router.isFallback) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
      }}>
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

  if (!project) {
    return {
      notFound: true,
    };
  }

  // Pass project without pre-calculated number - will be calculated client-side
  return {
    props: {
      project,
      projectNumber: null, // Will be calculated client-side for session consistency
    },
    revalidate: 60,
  };
} 