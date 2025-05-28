import { useRouter } from 'next/router';
import Head from 'next/head';
import { PROJECTS } from '../../utils/constant/dummy';
import ProjectDetail from '../../components/pages/ProjectDetail';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find the project by id
  const project = PROJECTS.find(p => p.id === parseInt(id));
  const projectIndex = PROJECTS.findIndex(p => p.id === parseInt(id));
  const projectNumber = projectIndex + 1;

  // Handle loading state
  if (router.isFallback || !project) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
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
    fallback: false, // Show 404 for non-existent projects
  };
}

// Get static props for each project
export async function getStaticProps({ params }) {
  const project = PROJECTS.find(p => p.id === parseInt(params.id));

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
} 