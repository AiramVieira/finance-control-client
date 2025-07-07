import { DollarSign, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Currency } from "../@types/currency";
import type { Finance } from "../@types/finances";
import { getExchangeRate } from "../services/currency";
import { addFinance, deleteFinance } from "../services/finances";
import { useAuth } from "../contexts/AuthContext";
import TotalCard from "../components/TotalCard";
import Input from "../components/Input";
import Select from "../components/Select";

const Dashboard = () => {
  const { secretKey, entries, setAuthData } = useAuth();
  const [localEntries, setLocalEntries] = useState<Finance[]>(entries);
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("BRL");
  const [description, setDescription] = useState<string>("");
  const [conversionRate, setConversionRate] = useState<number>(0);
  const navigate = useNavigate();

  const createNewEntry = (): Finance => {
    return {
      amount: parseFloat(amount),
      currency,
      description,
      date: new Date(),
      secretKey,
    };
  };

  const handleAddEntry = async () => {
    if (!amount || !description) {
      alert("Preencha todos os campos!");
      return;
    }

    const newEntry: Finance = createNewEntry();
    const finance = await addFinance(newEntry);

    const updatedEntries = localEntries
      ? [...localEntries, finance]
      : [finance];
    setLocalEntries(updatedEntries);
    setAuthData(secretKey, updatedEntries);
    clearForms();
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = localEntries.filter((entry) => entry._id !== id);
    setLocalEntries(updatedEntries);
    setAuthData(secretKey, updatedEntries);
    deleteFinance(id);
  };

  const clearForms = () => {
    setAmount("");
    setDescription("");
  };

  const fetchConversionRate = async () => {
    const exchangeRate = await getExchangeRate();
    setConversionRate(exchangeRate);
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchConversionRate();
  }, []);

  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <DollarSign className="text-green-400" />
            Sistema Financeiro
          </h1>
          <p className="text-blue-200">
            Controle seus ganhos de maneira rápida e simples
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Plus className="text-green-400" />
            Adicionar Novo Valor
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <Input
              label="Valor"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Select
              label="Moeda"
              value={currency}
              onChange={(value) => setCurrency(value as Currency)}
              options={[
                { value: "BRL", label: "Real (BRL)" },
                { value: "USD", label: "Dólar (USD)" },
              ]}
            />

            <Input
              label="Descrição"
              type="text"
              placeholder="Ex: Salário, Freelance..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex items-end">
              <button
                onClick={handleAddEntry}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Adicionar
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <TotalCard
            title="Total em Reais"
            currency="BRL"
            entries={localEntries || []}
            gradientFrom="from-green-500/20"
            gradientTo="to-green-600/20"
            borderColor="border-green-400/30"
            textColor="text-green-400"
          />

          <TotalCard
            title="Total em Dólares"
            currency="USD"
            entries={localEntries || []}
            gradientFrom="from-blue-500/20"
            gradientTo="to-blue-600/20"
            borderColor="border-blue-400/30"
            textColor="text-blue-400"
          />

          <TotalCard
            title="Total"
            entries={localEntries || []}
            conversionRate={conversionRate}
            gradientFrom="from-purple-500/20"
            gradientTo="to-purple-600/20"
            borderColor="border-purple-400/30"
            textColor="text-purple-400"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Valores Cadastrados
          </h2>

          {!localEntries?.length ? (
            <div className="text-center py-12">
              <DollarSign className="mx-auto text-white/30 mb-4" size={64} />
              <p className="text-white/60 text-lg">
                Nenhum valor cadastrado ainda
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                      Descrição
                    </th>
                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                      Moeda
                    </th>
                    <th className="text-right py-3 px-4 text-white/80 font-medium">
                      Valor
                    </th>
                    <th className="text-center py-3 px-4 text-white/80 font-medium">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(localEntries || []).map((entry) => (
                    <tr
                      key={entry._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-white/90">
                        {new Date(entry.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3 px-4 text-white/90">
                        {entry.description}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.currency === "BRL"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {entry.currency}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-white">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: entry.currency === "BRL" ? "BRL" : "USD",
                        }).format(entry.amount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteEntry(entry._id!)}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
