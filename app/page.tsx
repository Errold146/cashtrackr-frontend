import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui";
import { 
	CheckBadgeIcon, 
	SparklesIcon, 
	GlobeAltIcon, 
	ShieldCheckIcon 
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
	title: "Cashtrackr - Administrador de Gastos",
	description: "Controla tus finanzas personales con Cashtrackr. Administra tus gastos, presupuestos y finanzas de forma fácil e intuitiva.",
	keywords: "gastos, presupuesto, finanzas, administrador, dinero"
}

export default function Home() {
	return (
		<>

			<header className="bg-gradient-to-r from-purple-950 to-purple-900 py-5 shadow-lg">
				<div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center px-5">
					<div className="w-72 lg:w-96">
						<Link href={'/'} className="block hover:opacity-90 transition-opacity duration-300">
							<Logo />
						</Link>
					</div>
					<nav className="flex flex-col lg:flex-row justify-center lg:justify-end gap-5 w-full items-center lg:items-center">
						<Link
							href='/auth/login'
							className="font-bold text-white hover:text-amber-400 transition-colors duration-300 uppercase text-sm text-center py-2"
						>Iniciar Sesión</Link>
						<Link
							href='/auth/register'
							className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 font-bold text-white px-6 py-2 rounded-lg uppercase text-sm text-center"
						>Registrarme</Link>
					</nav>
				</div>
			</header>

			<main className="max-w-5xl mx-auto p-5 space-y-12 mt-20">
				<section className="space-y-4">
					<h1 className="font-black text-5xl lg:text-7xl text-purple-950 leading-tight">Administrador de <span className="text-amber-500">Gastos</span></h1>
					<p className="text-2xl lg:text-3xl font-bold text-gray-700">Controla tus <span className="text-amber-500">finanzas</span> inteligentemente</p>
					<p className="text-lg text-gray-600 max-w-2xl">Domina tus finanzas con Cashtrackr. Simplifica la gestión de tus ingresos y egresos en un solo lugar, de manera intuitiva y eficiente. Toma el control total de tus finanzas personales con nuestra plataforma moderna y segura.</p>
				</section>

				<section className="space-y-8">
					<h2 className="font-black text-4xl text-purple-950">¿Por qué elegir <span className="text-amber-500">CashTrackr</span>?</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="group p-8 rounded-xl shadow-md hover:shadow-xl hover:bg-amber-50 transition-all duration-300 border border-transparent hover:border-amber-200 bg-white">
							<div className="flex gap-4 items-start">
								<div className="p-3 rounded-lg bg-purple-100 group-hover:bg-amber-200 transition-colors duration-300">
									<CheckBadgeIcon className="w-8 h-8 text-purple-950" />
								</div>
								<div>
									<h3 className="text-purple-950 font-black text-lg mb-2">Organización sin Esfuerzo</h3>
									<p className="text-gray-700 leading-relaxed">Clasifica y visualiza tus gastos de forma clara y ordenada, sin complicaciones con nuestro panel amigable y fácil de usar.</p>
								</div>
							</div>
						</div>

						<div className="group p-8 rounded-xl shadow-md hover:shadow-xl hover:bg-amber-50 transition-all duration-300 border border-transparent hover:border-amber-200 bg-white">
							<div className="flex gap-4 items-start">
								<div className="p-3 rounded-lg bg-purple-100 group-hover:bg-amber-200 transition-colors duration-300">
									<SparklesIcon className="w-8 h-8 text-purple-950" />
								</div>
								<div>
									<h3 className="text-purple-950 font-black text-lg mb-2">Presupuestación Inteligente</h3>
									<p className="text-gray-700 leading-relaxed">Establece objetivos financieros realistas y sigue tu progreso con nuestras herramientas de presupuestación inteligente y visualización de datos.</p>
								</div>
							</div>
						</div>

						<div className="group p-8 rounded-xl shadow-md hover:shadow-xl hover:bg-amber-50 transition-all duration-300 border border-transparent hover:border-amber-200 bg-white">
							<div className="flex gap-4 items-start">
								<div className="p-3 rounded-lg bg-purple-100 group-hover:bg-amber-200 transition-colors duration-300">
									<GlobeAltIcon className="w-8 h-8 text-purple-950" />
								</div>
								<div>
									<h3 className="text-purple-950 font-black text-lg mb-2">Acceso en Cualquier Lugar</h3>
									<p className="text-gray-700 leading-relaxed">Nuestra plataforma está disponible para que puedas gestionar tus finanzas desde donde te encuentres, en cualquier dispositivo.</p>
								</div>
							</div>
						</div>

						<div className="group p-8 rounded-xl shadow-md hover:shadow-xl hover:bg-amber-50 transition-all duration-300 border border-transparent hover:border-amber-200 bg-white">
							<div className="flex gap-4 items-start">
								<div className="p-3 rounded-lg bg-purple-100 group-hover:bg-amber-200 transition-colors duration-300">
									<ShieldCheckIcon className="w-8 h-8 text-purple-950" />
								</div>
								<div>
									<h3 className="text-purple-950 font-black text-lg mb-2">Seguridad Garantizada</h3>
									<p className="text-gray-700 leading-relaxed">Protegemos tus datos con los más altos estándares de seguridad, para que puedas utilizar nuestra plataforma con total tranquilidad.</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-gradient-to-r from-purple-950 to-purple-900 rounded-2xl p-8 lg:p-12 text-white space-y-6 shadow-lg">
					<div>
						<h2 className="font-black text-3xl lg:text-4xl mb-2">¿Listo para tomar <span className="text-amber-400">control</span> de tus finanzas?</h2>
						<p className="text-purple-100">Únete a miles de usuarios que ya confían en Cashtrackr para administrar sus gastos.</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link 
							href="/auth/register"
							className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 font-bold text-white px-8 py-3 rounded-lg text-center"
						>Crear Cuenta Gratis</Link>
						<Link 
							href="/auth/login"
							className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white transition-colors duration-300 font-bold px-8 py-3 rounded-lg text-center"
						>Iniciar Sesión</Link>
					</div>
				</section>
			</main>

			<footer className="border-t border-gray-200 mt-20 py-12 bg-gray-50">
				<nav className="flex flex-col lg:flex-row lg:justify-between gap-5 max-w-5xl mx-auto px-5">
					<Link 
						href="/auth/register"
						className="text-gray-600 hover:text-purple-950 transition-colors duration-300 font-semibold uppercase text-sm text-center lg:text-left"
					>¿No tienes cuenta? Crea una</Link>
					<Link 
						href="/auth/login"
						className="text-gray-600 hover:text-purple-950 transition-colors duration-300 font-semibold uppercase text-sm text-center lg:text-left"
					>¿Ya tienes cuenta? Iniciar Sesión</Link>
				</nav>
			</footer>
		</>
	);
}