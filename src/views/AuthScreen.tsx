import { Eye, EyeOff, Unlock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFinances } from "../services/finances";
import { useAuth } from "../contexts/AuthContext";

const AuthScreen = () => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleSubmit = async () => {
    if (!secretKey.trim()) {
      alert("Por favor, insira uma chave de acesso!");
      return;
    }

    setIsLoading(true);
    try {
      const finances = await fetchFinances(secretKey);
      if (finances) {
        setAuthData(secretKey, finances);
        navigate("/dashboard");
      } else {
        alert("Chave inválida ou erro ao conectar!");
      }
    } catch (error) {
      alert("Erro ao validar a chave de acesso!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Unlock className="text-yellow-400" />
            Sistema Financeiro
          </h1>
          <p className="text-blue-200">
            Controle seus ganhos de maneira rápida e simples
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Unlock className="text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">
              Gerenciar Finanças
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type={showKey ? "text" : "password"}
                placeholder="Use ou crie uma chave de acesso"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                disabled={isLoading}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                disabled={isLoading}
              >
                {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 border-none! justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Unlock size={20} />
              {isLoading ? "Validando..." : "Acessar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen; 