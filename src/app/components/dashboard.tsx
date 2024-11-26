/* eslint-disable @next/next/no-img-element */
"use client";

import {useState} from "react";
import {
	Search,
	Download,
	AlertTriangle,
	CheckCircle,
	XCircle,
	LogIn,
	UserPlus,
	Dog,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function Dashboard() {
	const [dni, setDni] = useState("");
	const [category, setCategory] = useState("");
	const [showPayment, setShowPayment] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [riskLevel, setRiskLevel] = useState<"bajo" | "medio" | "alto">("medio");
	const [paymentCode, setPaymentCode] = useState("");
	const [verificationError, setVerificationError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPremium, setIsPremium] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showUpgrade, setShowUpgrade] = useState(false);
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerError, setRegisterError] = useState("");
	const [bulkQueries, setBulkQueries] = useState("");

	// Mock query history
	const [queryHistory] = useState([
		{id: 1, date: "2023-05-15", dni: "12345678", category: "Arrendador", riskLevel: "bajo"},
		{id: 2, date: "2023-05-16", dni: "87654321", category: "Empleador", riskLevel: "medio"},
		{id: 3, date: "2023-05-17", dni: "11223344", category: "Familia", riskLevel: "alto"},
	]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (dni && category) {
			setShowPayment(true);
		}
	};

	const handlePaymentVerification = (e: React.FormEvent) => {
		e.preventDefault();
		if (paymentCode === "123456") {
			setShowPayment(false);
			setShowReport(true);
			setRiskLevel(
				["bajo", "medio", "alto"][Math.floor(Math.random() * 3)] as "bajo" | "medio" | "alto"
			);
		} else {
			setVerificationError("Código de pago inválido. Por favor, inténtelo de nuevo.");
		}
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// This is a mock login. In a real application, you would validate against a backend.
		if (username === "usuario" && password === "contraseña") {
			setIsLoggedIn(true);
			setLoginError("");
			setShowLogin(false);
		} else {
			setLoginError("Nombre de usuario o contraseña incorrectos.");
		}
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setIsPremium(false);
		setUsername("");
		setPassword("");
	};

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		// This is a mock registration. In a real application, you would send this data to a backend.
		if (registerUsername && registerPassword && registerEmail) {
			// Simulate successful registration
			setIsLoggedIn(true);
			setUsername(registerUsername);
			setRegisterError("");
			setShowRegister(false);
			// Reset registration form
			setRegisterUsername("");
			setRegisterPassword("");
			setRegisterEmail("");
		} else {
			setRegisterError("Por favor, complete todos los campos.");
		}
	};

	const handleBulkQuery = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real application, you would process the bulk queries here
		console.log("Processing bulk queries:", bulkQueries);
		// Reset the form
		setBulkQueries("");
		// Show a success message or update UI accordingly
	};

	return (
		<div className="flex flex-col min-h-screen bg-background max-w-5xl mx-auto">
			<header className="px-4 lg:px-6 h-14 flex items-center border-b">
				<div className="flex items-center gap-2">
					<Dog className="h-8 w-8 text-primary" />
					<h1 className="text-lg font-bold">Sabueso Digital</h1>
				</div>
				<nav className="ml-auto hidden sm:flex gap-2 sm:gap-4">
					{isLoggedIn ? (
						<>
							<Button variant="outline" onClick={() => setShowUpgrade(true)}>
								Actualizar a Premium
							</Button>
							<Button variant="outline" onClick={handleLogout}>
								Cerrar Sesión
							</Button>
						</>
					) : (
						<>
							<Button variant="outline" onClick={() => setShowLogin(true)}>
								<LogIn className="mr-2 h-4 w-4" />
								Iniciar Sesión
							</Button>
							<Button variant="outline" onClick={() => setShowRegister(true)}>
								<UserPlus className="mr-2 h-4 w-4" />
								Registrarse
							</Button>
						</>
					)}
				</nav>
				<nav className="sm:hidden flex ml-auto gap-2 sm:gap-4">
					{isLoggedIn ? (
						<>
							<Button variant="outline" onClick={() => setShowUpgrade(true)}>
								Actualizar a Premium
							</Button>
							<Button variant="outline" onClick={handleLogout}>
								Cerrar Sesión
							</Button>
						</>
					) : (
						<>
							<Button variant="outline" onClick={() => setShowLogin(true)}>
								<LogIn className="h-4 w-4" />
							</Button>
							<Button variant="outline" onClick={() => setShowRegister(true)}>
								<UserPlus className="h-4 w-4" />
							</Button>
						</>
					)}
				</nav>
			</header>
			<main className="flex-1 p-4 lg:p-6">
				<Tabs defaultValue="individual" className="space-y-4">
					<TabsList>
						<TabsTrigger value="individual">Consulta Individual</TabsTrigger>
						{isLoggedIn && isPremium && <TabsTrigger value="bulk">Consulta Masiva</TabsTrigger>}
						{isLoggedIn && <TabsTrigger value="history">Historial</TabsTrigger>}
					</TabsList>
					<TabsContent value="individual" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Evaluación de Riesgo Individual</CardTitle>
								<CardDescription>Evalúe los riesgos para un individuo o entidad</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSearch} className="space-y-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="dni">DNI (Documento Nacional de Identidad)</Label>
											<Input
												id="dni"
												placeholder="Ingrese DNI"
												value={dni}
												onChange={(e) => setDni(e.target.value)}
												required
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="category">Categoría</Label>
											<Select value={category} onValueChange={setCategory} required>
												<SelectTrigger id="category">
													<SelectValue placeholder="Seleccione categoría" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="landlord">Arrendador</SelectItem>
													<SelectItem value="employer">Empleador</SelectItem>
													<SelectItem value="family">Familia</SelectItem>
													<SelectItem value="highprofile">Persona de Alto Perfil</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<Button type="submit">
										<Search className="mr-2 h-4 w-4" /> Evaluar Riesgo
									</Button>
								</form>
							</CardContent>
						</Card>
						{showPayment && (
							<Card>
								<CardHeader>
									<CardTitle>Pago Requerido</CardTitle>
									<CardDescription>
										Por favor, complete el pago para ver la evaluación de riesgo
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex flex-col justify-center items-center">
											<img src="qr_fake.avif" alt="Código QR de Pago" className="mb-2 w-36 h-36" />
											<p>Escanee con Yape o Plin</p>
										</div>
										<form onSubmit={handlePaymentVerification} className="space-y-4">
											<div className="space-y-2">
												<Label htmlFor="paymentCode">Código de Verificación de Pago</Label>
												<Input
													id="paymentCode"
													placeholder="Ingrese código de verificación"
													value={paymentCode}
													onChange={(e) => setPaymentCode(e.target.value)}
													required
												/>
											</div>
											{verificationError && (
												<p className="text-red-500 text-sm">{verificationError}</p>
											)}
											<Button type="submit" className="w-full">
												Verificar Pago
											</Button>
										</form>
									</div>
								</CardContent>
							</Card>
						)}
						{showReport && <RiskReport riskLevel={riskLevel} />}
					</TabsContent>
					<TabsContent value="bulk" className="space-y-4">
						{isLoggedIn && isPremium ? (
							<Card>
								<CardHeader>
									<CardTitle>Evaluación de Riesgo Masiva</CardTitle>
									<CardDescription>
										Evalúe riesgos para múltiples individuos o entidades
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleBulkQuery} className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="bulk-queries">
												DNIs y Categorías (uno por línea, separados por coma)
											</Label>
											<Textarea
												id="bulk-queries"
												placeholder="12345678,Arrendador&#10;87654321,Empleador&#10;11223344,Familia"
												value={bulkQueries}
												onChange={(e) => setBulkQueries(e.target.value)}
												rows={5}
												required
											/>
										</div>
										<Button type="submit">
											<Search className="mr-2 h-4 w-4" /> Evaluar Riesgos en Lote
										</Button>
									</form>
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardHeader>
									<CardTitle>Consulta Masiva no disponible</CardTitle>
									<CardDescription>
										{isLoggedIn
											? "Actualice a una cuenta Premium para acceder a la función de consulta masiva."
											: "Inicie sesión y actualice a una cuenta Premium para acceder a la función de consulta masiva."}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button onClick={() => setShowUpgrade(true)}>Actualizar a Premium</Button>
								</CardContent>
							</Card>
						)}
					</TabsContent>
					{isLoggedIn && (
						<TabsContent value="history" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Historial de Consultas</CardTitle>
									<CardDescription>Revise sus consultas anteriores</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{queryHistory.map((query) => (
											<div
												key={query.id}
												className="flex items-center justify-between border-b pb-2"
											>
												<div>
													<p className="font-medium">{query.date}</p>
													<p className="text-sm text-muted-foreground">
														DNI: {query.dni}, Categoría: {query.category}
													</p>
												</div>
												<div className="flex items-center">
													<span
														className={`inline-block w-3 h-3 rounded-full mr-2 ${
															query.riskLevel === "bajo"
																? "bg-green-500"
																: query.riskLevel === "medio"
																? "bg-yellow-500"
																: "bg-red-500"
														}`}
													/>
													<span className="capitalize">{query.riskLevel}</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					)}
				</Tabs>
			</main>
			<footer className="py-6 px-4 lg:px-6 border-t">
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Sabueso Digital. Todos los derechos reservados.
					</p>
					<nav className="flex gap-4 sm:gap-6">
						<a className="text-sm hover:underline underline-offset-4" href="#">
							Términos de Servicio
						</a>
						<a className="text-sm hover:underline underline-offset-4" href="#">
							Política de Privacidad
						</a>
					</nav>
				</div>
			</footer>
			<Dialog open={showLogin} onOpenChange={setShowLogin}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Iniciar Sesión</DialogTitle>
						<DialogDescription>
							Ingrese sus credenciales para acceder a su cuenta.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleLogin} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Nombre de Usuario</Label>
							<Input
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{loginError && <p className="text-red-500 text-sm">{loginError}</p>}
						<Button type="submit" className="w-full">
							Iniciar Sesión
						</Button>
					</form>
					<p className="text-sm text-center mt-4">
						¿No tiene una cuenta?{" "}
						<Button
							variant="link"
							className="p-0"
							onClick={() => {
								setShowLogin(false);
								setShowRegister(true);
							}}
						>
							Regístrese aquí
						</Button>
					</p>
				</DialogContent>
			</Dialog>
			<Dialog open={showRegister} onOpenChange={setShowRegister}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Registrarse</DialogTitle>
						<DialogDescription>
							Cree una nueva cuenta para acceder a Sabueso Digital.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleRegister} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="register-username">Nombre de Usuario</Label>
							<Input
								id="register-username"
								value={registerUsername}
								onChange={(e) => setRegisterUsername(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="register-email">Correo Electrónico</Label>
							<Input
								id="register-email"
								type="email"
								value={registerEmail}
								onChange={(e) => setRegisterEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="register-password">Contraseña</Label>
							<Input
								id="register-password"
								type="password"
								value={registerPassword}
								onChange={(e) => setRegisterPassword(e.target.value)}
								required
							/>
						</div>
						{registerError && <p className="text-red-500 text-sm">{registerError}</p>}
						<Button type="submit" className="w-full">
							Registrarse
						</Button>
					</form>
					<p className="text-sm text-center mt-4">
						¿Ya tiene una cuenta?{" "}
						<Button
							variant="link"
							className="p-0"
							onClick={() => {
								setShowRegister(false);
								setShowLogin(true);
							}}
						>
							Inicie sesión aquí
						</Button>
					</p>
				</DialogContent>
			</Dialog>
			<Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Actualizar a Premium</DialogTitle>
						<DialogDescription>
							Obtenga acceso a funciones avanzadas como consultas masivas y más.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<p>Las características Premium incluyen:</p>
						<ul className="list-disc list-inside">
							<li>Consultas masivas</li>
							<li>Informes detallados</li>
							<li>Alertas en tiempo real</li>
							<li>Soporte prioritario</li>
						</ul>
						<Button
							onClick={() => {
								setIsPremium(true);
								setShowUpgrade(false);
							}}
							className="w-full"
						>
							Actualizar Ahora
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

interface RiskReportProps {
	riskLevel: "bajo" | "medio" | "alto";
}

function RiskReport({riskLevel}: RiskReportProps) {
	const riskColor = {
		bajo: "bg-green-500",
		medio: "bg-yellow-500",
		alto: "bg-red-500",
	};

	const riskIcon = {
		bajo: <CheckCircle className="h-6 w-6 text-green-500" />,
		medio: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
		alto: <XCircle className="h-6 w-6 text-red-500" />,
	};

	const riskMessages = {
		bajo: {
			title: "Riesgo Bajo",
			findings: [
				"Historial crediticio: Excelente historial de pagos",
				"Antecedentes penales: Sin antecedentes",
				"Historial laboral: Estable y consistente",
				"Presencia en redes sociales: Perfil profesional y positivo",
			],
			recommendation: "Este perfil presenta un riesgo bajo. Puede proceder con confianza.",
		},
		medio: {
			title: "Riesgo Medio",
			findings: [
				"Historial crediticio: Algunos pagos atrasados en los últimos 2 años",
				"Antecedentes penales: Sin antecedentes graves",
				"Historial laboral: Algunos cambios de trabajo frecuentes",
				"Presencia en redes sociales: Algunas publicaciones cuestionables",
			],
			recommendation:
				"Considere realizar una verificación adicional y solicitar más referencias antes de tomar una decisión.",
		},
		alto: {
			title: "Riesgo Alto",
			findings: [
				"Historial crediticio: Múltiples incumplimientos de pago",
				"Antecedentes penales: Presencia de antecedentes significativos",
				"Historial laboral: Largos períodos de desempleo o información inconsistente",
				"Presencia en redes sociales: Contenido preocupante o actividad sospechosa",
			],
			recommendation:
				"Se recomienda extrema precaución. Realice una investigación exhaustiva antes de proceder.",
		},
	};

	const currentRisk = riskMessages[riskLevel];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Informe de Riesgo</CardTitle>
				<CardDescription>Resultados detallados de la evaluación de riesgo</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center space-x-4">
						<div className={`w-6 h-6 rounded-full ${riskColor[riskLevel]}`} />
						<div className="flex items-center space-x-2">
							{riskIcon[riskLevel]}
							<p className="font-medium capitalize">{currentRisk.title}</p>
						</div>
					</div>
					<div className="space-y-2">
						<h3 className="font-medium">Hallazgos Clave:</h3>
						<ul className="list-disc list-inside space-y-1 text-sm">
							{currentRisk.findings.map((finding, index) => (
								<li key={index}>{finding}</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="font-medium">Recomendaciones:</h3>
						<p className="text-sm">{currentRisk.recommendation}</p>
					</div>
					<div className="flex justify-between items-center">
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" /> Descargar Informe PDF
						</Button>
						<p className="text-sm text-muted-foreground">
							<a href="#" className="underline">
								Actualice a Premium
							</a>{" "}
							para obtener información más detallada
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
