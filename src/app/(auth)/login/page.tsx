import Loader from "@/components/common/loader/Loader";
import Login from "@/components/pages/auth/login/Login";
import { Suspense } from "react";

export default function LoginPage() {
	return (
		<Suspense fallback={<Loader fullscreen />}>
			<main>
				<Login />
			</main>
		</Suspense>
	)
}