import { Trophy, Shield, Gift, GraduationCap, Coins, ExternalLink, Star } from "lucide-react";
import standardImg from "@/assets/aluno_standard.png";
import premiumImg from "@/assets/aluno_premium.png";

interface MilestoneRewardsProps {
  userPoints: number;
}

const MilestoneRewards = ({ userPoints }: MilestoneRewardsProps) => {
  const standardUnlocked = userPoints >= 40;
  const premiumUnlocked = userPoints >= 60;

  return (
    <div
      className="w-full max-w-2xl mx-auto mt-10 animate-scale-in"
      style={{ animationDelay: "0.9s", animationFillMode: "backwards" }}
    >
      <div className="bg-white rounded-2xl border border-border p-5 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold font-display text-[#1a237e] flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#1a237e]" />
            Prêmios dos Marcos
          </h3>
          <a
            href="https://rsvp.withgoogle.com/events/arcade-facilitador/sistema-de-pontos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-body text-[#1a237e]/70 hover:text-primary transition-colors"
          >
            <span>Ver regras oficiais</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <p className="text-sm text-[#1a237e]/80 font-body leading-relaxed">
          Ao acumular Arcade Points concluindo cursos, Skill Badges e Arcade Games, você pode resgatar prêmios e brindes do Google Cloud.
          Você será premiado pelo <strong className="text-[#1a237e]">último marco alcançado</strong> (os prêmios não são cumulativos).
          É necessário estar entre as <strong className="text-[#1a237e]">1.000 primeiras pessoas</strong> a atingir cada marco.
        </p>
      </div>

      <div className="space-y-5">
        {/* Marco Standard */}
        <div
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
            standardUnlocked
              ? "border-primary/50 shadow-lg"
              : "border-border opacity-75"
          }`}
        >
          <div className={`px-5 py-3 flex items-center gap-3 ${
            standardUnlocked
              ? "bg-primary/10"
              : "bg-muted/30"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              standardUnlocked
                ? "bg-primary/20 border-primary/40"
                : "bg-muted/50 border-border"
            }`}>
              <Shield className={`w-5 h-5 ${standardUnlocked ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold font-display text-sm ${standardUnlocked ? "text-primary" : "text-muted-foreground"}`}>
                🏆 Marco Standard — 40 Pontos
              </h4>
              <p className="text-xs text-muted-foreground font-body">
                {standardUnlocked ? "✅ Marco alcançado!" : `Faltam ${40 - userPoints} pontos`}
              </p>
            </div>
            {standardUnlocked && (
              <span className="text-xs font-bold font-display text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                <Star className="w-3 h-3 inline mr-1" />Conquistado
              </span>
            )}
          </div>

          <div className="p-5 bg-card space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <Gift className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">Kit Google Cloud</p>
                  <p className="text-xs text-muted-foreground font-body">Caneta + mochila saco exclusiva Google Cloud</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <Coins className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">500 Créditos</p>
                  <p className="text-xs text-muted-foreground font-body">Créditos gratuitos do Google Skills para continuar estudando</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <GraduationCap className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">Voucher 100% OFF</p>
                  <p className="text-xs text-muted-foreground font-body">Exame de certificação Google Cloud Generative AI Leader (US$ 99)</p>
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
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
            premiumUnlocked
              ? "border-neon-green/50 shadow-lg"
              : "border-border opacity-75"
          }`}
        >
          <div className={`px-5 py-3 flex items-center gap-3 ${
            premiumUnlocked
              ? "bg-neon-green/10"
              : "bg-muted/30"
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              premiumUnlocked
                ? "bg-neon-green/20 border-neon-green/40"
                : "bg-muted/50 border-border"
            }`}>
              <Trophy className={`w-5 h-5 ${premiumUnlocked ? "text-neon-green" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold font-display text-sm ${premiumUnlocked ? "text-neon-green" : "text-muted-foreground"}`}>
                🏆 Marco Premium — 60 Pontos
              </h4>
              <p className="text-xs text-muted-foreground font-body">
                {premiumUnlocked ? "✅ Marco alcançado!" : `Faltam ${Math.max(0, 60 - userPoints)} pontos`}
              </p>
            </div>
            {premiumUnlocked && (
              <span className="text-xs font-bold font-display text-neon-green bg-neon-green/10 px-2.5 py-1 rounded-full border border-neon-green/20">
                <Star className="w-3 h-3 inline mr-1" />Conquistado
              </span>
            )}
          </div>

          <div className="p-5 bg-card space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <Coins className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">1000 Créditos</p>
                  <p className="text-xs text-muted-foreground font-body">Créditos gratuitos do Google Skills para continuar estudando</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <GraduationCap className="w-5 h-5 text-neon-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">Voucher 100% OFF</p>
                  <p className="text-xs text-muted-foreground font-body">Exame de certificação Google Cloud Generative AI Leader (US$ 99)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                <Gift className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold font-body text-foreground">Brinde Exclusivo</p>
                  <p className="text-xs text-muted-foreground font-body">Escolha 1 entre: garrafa, moletom, boné + óculos ou camiseta</p>
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
