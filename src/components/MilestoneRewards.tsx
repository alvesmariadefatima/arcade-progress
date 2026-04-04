import { useEffect, useRef } from "react";
import { Trophy, Shield, Gift, GraduationCap, Coins, ExternalLink, Star } from "lucide-react";
import confetti from "canvas-confetti";
import standardImg from "@/assets/aluno_standard.png";
import premiumImg from "@/assets/aluno_premium.png";

interface MilestoneRewardsProps {
  userPoints: number;
}

const MilestoneRewards = ({ userPoints }: MilestoneRewardsProps) => {
  const standardUnlocked = userPoints >= 40;
  const premiumUnlocked = userPoints >= 60;
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    if (!standardUnlocked && !premiumUnlocked) return;
    confettiFired.current = true;

    const colors = premiumUnlocked
      ? ["#4285F4", "#EA4335", "#FBBC04", "#34A853", "#1a237e", "#FFD700"]
      : ["#4285F4", "#1a237e", "#34A853", "#FBBC04"];

    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [standardUnlocked, premiumUnlocked]);
  return (
    <div
      className="w-full max-w-2xl mx-auto mt-10 animate-scale-in"
      style={{ animationDelay: "0.9s", animationFillMode: "backwards" }}
    >
      <div className="bg-white rounded-2xl border border-border p-5 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded arcade-gradient">
              <Gift className="w-4 h-4 text-white" />
            </span>
            Prêmios dos Marcos
          </h3>
          <a
            href="https://rsvp.withgoogle.com/events/arcade-facilitador/sistema-de-pontos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Ver regras oficiais</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          Ao acumular Arcade Points concluindo cursos, Skill Badges e Arcade Games, você pode resgatar prêmios e brindes do Google Cloud.
          Você será premiado pelo <strong className="text-foreground">último marco alcançado</strong> (os prêmios não são cumulativos).
          É necessário estar entre as <strong className="text-foreground">1.000 primeiras pessoas</strong> a atingir cada marco.
        </p>
      </div>

      <div className="space-y-5">
        {/* Marco Standard */}
        <div
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 bg-white ${
            standardUnlocked
              ? "border-[#1a237e]/30 shadow-lg"
              : "border-gray-200 opacity-75"
          }`}
        >
          <div className={`px-5 py-3 flex items-center gap-3 ${
            standardUnlocked
              ? "bg-[#1a237e]/10"
              : "bg-gray-100"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              standardUnlocked
                ? "bg-[#1a237e]/20 border-[#1a237e]/40"
                : "bg-gray-200 border-gray-300"
            }`}>
              <Shield className={`w-5 h-5 ${standardUnlocked ? "text-[#1a237e]" : "text-gray-500"}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold font-display text-sm ${standardUnlocked ? "text-[#1a237e]" : "text-gray-500"}`}>
                🏆 Marco Standard — 40 Pontos
              </h4>
              <p className="text-xs text-[#1a237e]/70 font-body">
                {standardUnlocked ? "✅ Marco alcançado!" : `Faltam ${40 - userPoints} pontos`}
              </p>
            </div>
            {standardUnlocked && (
              <span className="text-xs font-bold font-display text-[#1a237e] bg-[#1a237e]/10 px-2.5 py-1 rounded-full border border-[#1a237e]/20">
                <Star className="w-3 h-3 inline mr-1" />Conquistado
              </span>
            )}
          </div>

          <div className="p-5 bg-white space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <Gift className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">Kit Google Cloud</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Caneta + mochila saco exclusiva Google Cloud</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <Coins className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">500 Créditos</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Créditos gratuitos do Google Skills para continuar estudando</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <GraduationCap className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">Voucher 100% OFF</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Exame de certificação Google Cloud Generative AI Leader (US$ 99)</p>
                </div>
              </div>
            </div>

            <img
              src={standardImg}
              alt="Prêmios Marco Standard"
              className="w-full rounded-xl border border-border"
              loading="lazy"
            />
          </div>
        </div>

        {/* Marco Premium */}
        <div
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 bg-white ${
            premiumUnlocked
              ? "border-[#1a237e]/30 shadow-lg"
              : "border-gray-200 opacity-75"
          }`}
        >
          <div className={`px-5 py-3 flex items-center gap-3 ${
            premiumUnlocked
              ? "bg-[#1a237e]/10"
              : "bg-gray-100"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              premiumUnlocked
                ? "bg-[#1a237e]/20 border-[#1a237e]/40"
                : "bg-gray-200 border-gray-300"
            }`}>
              <Trophy className={`w-5 h-5 ${premiumUnlocked ? "text-[#1a237e]" : "text-gray-500"}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold font-display text-sm ${premiumUnlocked ? "text-[#1a237e]" : "text-gray-500"}`}>
                🏆 Marco Premium — 60 Pontos
              </h4>
              <p className="text-xs text-[#1a237e]/70 font-body">
                {premiumUnlocked ? "✅ Marco alcançado!" : `Faltam ${Math.max(0, 60 - userPoints)} pontos`}
              </p>
            </div>
            {premiumUnlocked && (
              <span className="text-xs font-bold font-display text-[#1a237e] bg-[#1a237e]/10 px-2.5 py-1 rounded-full border border-[#1a237e]/20">
                <Star className="w-3 h-3 inline mr-1" />Conquistado
              </span>
            )}
          </div>

          <div className="p-5 bg-white space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <Coins className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">1000 Créditos</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Créditos gratuitos do Google Skills para continuar estudando</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <GraduationCap className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">Voucher 100% OFF</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Exame de certificação Google Cloud Generative AI Leader (US$ 99)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#1a237e]/15 bg-[#1a237e]/5 p-3">
                <Gift className="w-5 h-5 text-[#1a237e] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-[#1a237e]">Brinde Exclusivo</p>
                  <p className="text-xs text-[#1a237e]/70 font-body">Escolha 1 entre: garrafa, moletom, boné + óculos ou camiseta</p>
                </div>
              </div>
            </div>

            <img
              src={premiumImg}
              alt="Prêmios Marco Premium"
              className="w-full rounded-xl border border-border"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneRewards;
