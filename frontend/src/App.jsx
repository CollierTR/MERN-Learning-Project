import { Route, Routes } from "react-router-dom";
import Public from "./componets/Public";
import Layout from "./componets/Layout";
import Login from "./features/auth/Login";
import DashLayout from "./componets/DashLayout";
import WelcomePage from "./features/auth/WelcomePage";
import UsersList from "./features/users/UsersList";
import NotesList from "./features/notes/NotesList";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>

					<Route index element={<Public />} />
					<Route path="/login" element={<Login />} />

					<Route path="/dash" element={<DashLayout />}>
						<Route index element={<WelcomePage />} />
						<Route path="notes">
							<Route index element={<NotesList />} />
						</Route>
						<Route path="users">
							<Route index element={<UsersList />} />
						</Route>
					</Route>

				</Route>
			</Routes>
		</>
	);
}

export default App;
