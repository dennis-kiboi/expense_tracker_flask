import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div className="flex items-center justify-center h-screen">
			<Button color="primary" as={Link} to={'/dashboard'}>
				Go to Dashboard
			</Button>
		</div>
	);
}

export default App;
