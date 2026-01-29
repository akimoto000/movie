import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";

// 色設定
const colors = {
  primary: "#1a5c6b",
  secondary: "#2d8a9b",
  accent: "#c9a962",
  white: "#ffffff",
  lightBg: "#f5f9fa",
  dark: "#1a1a2e",
};

// フェードイン・スケールアニメーション
const FadeInScale: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>{children}</div>
  );
};

// スライドインアニメーション
const SlideIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}> = ({ children, delay = 0, direction = "up" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  const { x, y } = directions[direction];
  const translateX = interpolate(progress, [0, 1], [x, 0]);
  const translateY = interpolate(progress, [0, 1], [y, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

// シーン1: オープニング
const Opening: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FadeInScale delay={10}>
        <div
          style={{
            fontSize: 28,
            color: colors.accent,
            fontWeight: 500,
            letterSpacing: 8,
            marginBottom: 20,
          }}
        >
          自由診療専門
        </div>
      </FadeInScale>

      <FadeInScale delay={25}>
        <div
          style={{
            fontSize: 64,
            color: colors.white,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          アキモト・プライベート
          <br />
          デンタルオフィス
        </div>
      </FadeInScale>

      <FadeInScale delay={50}>
        <div
          style={{
            fontSize: 24,
            color: colors.white,
            opacity: 0.9,
            marginTop: 30,
            letterSpacing: 2,
          }}
        >
          最期までキレイで健康な歯を
        </div>
      </FadeInScale>
    </AbsoluteFill>
  );
};

// シーン2: お悩み提示
const Problems: React.FC = () => {
  const problems = [
    "何度通院しても良くならない",
    "歯磨きしても虫歯ができる",
    "自然に笑えない",
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.lightBg,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <SlideIn delay={5}>
        <div
          style={{
            fontSize: 36,
            color: colors.dark,
            fontWeight: 600,
            marginBottom: 50,
          }}
        >
          こんなお悩みありませんか？
        </div>
      </SlideIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
        {problems.map((problem, index) => (
          <SlideIn key={index} delay={30 + index * 20} direction="left">
            <div
              style={{
                fontSize: 32,
                color: colors.primary,
                display: "flex",
                alignItems: "center",
                gap: 15,
              }}
            >
              <span style={{ color: colors.accent, fontSize: 40 }}>?</span>
              {problem}
            </div>
          </SlideIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// シーン3: 特徴紹介
const Features: React.FC = () => {
  const features = [
    { icon: "🔬", text: "徹底した検査で根本治療" },
    { icon: "👤", text: "完全予約制・1日最大5名" },
    { icon: "🏥", text: "最先端の設備と技術" },
    { icon: "💬", text: "顕微鏡映像で丁寧な説明" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.lightBg} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 60,
      }}
    >
      <SlideIn delay={5}>
        <div
          style={{
            fontSize: 40,
            color: colors.primary,
            fontWeight: 700,
            marginBottom: 50,
          }}
        >
          選ばれる理由
        </div>
      </SlideIn>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 900,
        }}
      >
        {features.map((feature, index) => (
          <FadeInScale key={index} delay={25 + index * 15}>
            <div
              style={{
                background: colors.white,
                borderRadius: 20,
                padding: "30px 40px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 20,
                borderLeft: `4px solid ${colors.accent}`,
              }}
            >
              <span style={{ fontSize: 40 }}>{feature.icon}</span>
              <span
                style={{
                  fontSize: 24,
                  color: colors.dark,
                  fontWeight: 500,
                }}
              >
                {feature.text}
              </span>
            </div>
          </FadeInScale>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// シーン4: 診療内容
const Services: React.FC = () => {
  const services = [
    "インプラント",
    "矯正治療",
    "根管治療",
    "審美治療",
    "歯周病治療",
    "無痛治療",
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <SlideIn delay={5}>
        <div
          style={{
            fontSize: 40,
            color: colors.white,
            fontWeight: 700,
            marginBottom: 50,
          }}
        >
          診療内容
        </div>
      </SlideIn>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 800,
        }}
      >
        {services.map((service, index) => (
          <FadeInScale key={index} delay={20 + index * 10}>
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 50,
                padding: "15px 35px",
                border: `2px solid ${colors.accent}`,
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  color: colors.white,
                  fontWeight: 500,
                }}
              >
                {service}
              </span>
            </div>
          </FadeInScale>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// シーン5: アクセス・連絡先
const Contact: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FadeInScale delay={5}>
        <div
          style={{
            fontSize: 48,
            color: colors.white,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          アキモト・プライベート・デンタルオフィス
        </div>
      </FadeInScale>

      <SlideIn delay={25}>
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 20,
            padding: "40px 60px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: colors.primary,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            045-548-9692
          </div>
          <div
            style={{
              fontSize: 22,
              color: colors.dark,
              marginBottom: 15,
            }}
          >
            横浜駅西口 徒歩7分
          </div>
          <div
            style={{
              fontSize: 20,
              color: colors.dark,
              opacity: 0.8,
            }}
          >
            診療時間 8:30〜17:00（水〜日）
          </div>
        </div>
      </SlideIn>

      <FadeInScale delay={50}>
        <div
          style={{
            fontSize: 28,
            color: colors.accent,
            fontWeight: 600,
            marginTop: 40,
          }}
        >
          まずはカウンセリングから
        </div>
      </FadeInScale>
    </AbsoluteFill>
  );
};

// メインコンポジション
export const ClinicPR: React.FC = () => {
  // 30秒 = 900フレーム (30fps)
  // シーン配分:
  // Opening: 0-150 (5秒)
  // Problems: 150-300 (5秒)
  // Features: 300-540 (8秒)
  // Services: 540-720 (6秒)
  // Contact: 720-900 (6秒)

  return (
    <AbsoluteFill style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <Sequence from={0} durationInFrames={150}>
        <Opening />
      </Sequence>

      <Sequence from={150} durationInFrames={150}>
        <Problems />
      </Sequence>

      <Sequence from={300} durationInFrames={240}>
        <Features />
      </Sequence>

      <Sequence from={540} durationInFrames={180}>
        <Services />
      </Sequence>

      <Sequence from={720} durationInFrames={180}>
        <Contact />
      </Sequence>
    </AbsoluteFill>
  );
};
