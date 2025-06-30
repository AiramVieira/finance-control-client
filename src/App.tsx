import { DollarSign, Eye, EyeOff, Plus, Trash2, Unlock } from "lucide-react";
import { useState } from "react";
import type { Currency } from "./@types/currency";
import type { Finance } from "./@types/finances";
import { addFinance, deleteFinance, fetchFinances } from "./services/finances";
import { formatCurrency, getTotalValueByCurrency } from "./utils/currency";

const FinancialTracker = () => {
  const [entries, setEntries] = useState<Finance[]>([]);
  const [secretKey, setSecretKey] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("BRL");
  const [description, setDescription] = useState<string>("");

  const createNewEntry = (): Finance => {
    return {
      amount: parseFloat(amount),
      currency,
      description,
      date: new Date(),
      secretKey,
    };
  };

  const handleDecrypt = async () => {
    const finances = await fetchFinances(secretKey);
    finances?.length && setEntries(finances);
    setIsUnlocked(true);
  };

  const handleAddEntry = () => {
    if (!amount || !description) {
      alert("Preencha todos os campos!");
      return;
    }

    const newEntry: Finance = createNewEntry();
    setEntries((prev) => (prev ? [...prev, newEntry] : [newEntry]));

    clearForms();
    addFinance(newEntry);
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry._id !== id);
    setEntries(updatedEntries);
    deleteFinance(id);
  };

  const clearForms = () => {
    setAmount("");
    setDescription("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <DollarSign className="text-green-400" />
            Sistema Financeiro
          </h1>
          <p className="text-blue-200">
            Controle seus valores com criptografia
          </p>
        </div>

        {/* Área de Descriptografia */}
        {!isUnlocked && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Unlock className="text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">
                Descriptografar Dados
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="Digite a chave de descriptografia"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                  onKeyPress={(e) => e.key === "Enter" && handleDecrypt()}
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                onClick={handleDecrypt}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2"
              >
                <Unlock size={20} />
                Descriptografar
              </button>
            </div>
          </div>
        )}

        {isUnlocked && (
          <>
            {/* Formulário de Cadastro */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Plus className="text-green-400" />
                Adicionar Novo Valor
              </h2>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Valor
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Moeda
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="BRL" className="bg-slate-800">
                      Real (BRL)
                    </option>
                    <option value="USD" className="bg-slate-800">
                      Dólar (USD)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Salário, Freelance..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

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

            {/* Totalizadores */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Total em Reais
                </h3>
                <p className="text-3xl font-bold text-green-400">
                  {formatCurrency(
                    getTotalValueByCurrency(entries || [], "BRL"),
                    "BRL"
                  )}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Total em Dólares
                </h3>
                <p className="text-3xl font-bold text-blue-400">
                  {formatCurrency(
                    getTotalValueByCurrency(entries || [], "USD"),
                    "USD"
                  )}
                </p>
              </div>
            </div>

            {/* Tabela de Valores */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Valores Cadastrados
              </h2>

              {!entries?.length ? (
                <div className="text-center py-12">
                  <DollarSign
                    className="mx-auto text-white/30 mb-4"
                    size={64}
                  />
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
                      {(entries || []).map((entry) => (
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
                            {formatCurrency(entry.amount, entry.currency)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialTracker;
