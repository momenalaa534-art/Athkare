/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { lazy, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Trophy, Star, Mic, MessageSquare, LayoutGrid } from 'lucide-react';
import { useStore, Screen } from './store';
import { useTranslation } from './i18n';
import { useAthkarNotifications } from './hooks/useAthkarNotifications';
import { useWirdReminder } from './hooks/useWirdReminder';
import { useFocusMode } from './hooks/useFocusMode';
import { usePrayerNotifications } from './hooks/usePrayerNotifications';
import { useChallengeSync } from './hooks/useChallengeSync';

const HomeScreen = lazy(() => import('./screens/HomeScreen').then((m) => ({ default: m.HomeScreen })));
const AthkarScreen = lazy(() => import('./screens/AthkarScreen').then((m) => ({ default: m.AthkarScreen })));
const AthkarCategoriesScreen = lazy(() => import('./screens/AthkarCategoriesScreen').then((m) => ({ default: m.AthkarCategoriesScreen })));
const TasbihScreen = lazy(() => import('./screens/TasbihScreen').then((m) => ({ default: m.TasbihScreen })));
const KidsHomeScreen = lazy(() => import('./screens/KidsScreen').then((m) => ({ default: m.KidsHomeScreen })));
const QuranScreen = lazy(() => import('./screens/QuranScreen').then((m) => ({ default: m.QuranScreen })));
const TasmeeScreen = lazy(() => import('./screens/TasmeeScreen').then((m) => ({ default: m.TasmeeScreen })));
const HadithQuizScreen = lazy(() => import('./screens/HadithQuizScreen').then((m) => ({ default: m.HadithQuizScreen })));
const ChallengesScreen = lazy(() => import('./screens/ChallengesScreen').then((m) => ({ default: m.ChallengesScreen })));
const RewardsScreen = lazy(() => import('./screens/RewardsScreen').then((m) => ({ default: m.RewardsScreen })));
const AIDuaScreen = lazy(() => import('./screens/AIDuaScreen').then((m) => ({ default: m.AIDuaScreen })));
const FullQuranScreen = lazy(() => import('./screens/FullQuranScreen').then((m) => ({ default: m.FullQuranScreen })));
const SurahScreen = lazy(() => import('./screens/SurahScreen').then((m) => ({ default: m.SurahScreen })));
const PrayerTimesScreen = lazy(() => import('./screens/PrayerTimesScreen').then((m) => ({ default: m.PrayerTimesScreen })));
const HadithLibraryScreen = lazy(() => import('./screens/HadithLibraryScreen').then((m) => ({ default: m.HadithLibraryScreen })));
const IslamicStoriesScreen = lazy(() => import('./screens/IslamicStoriesScreen').then((m) => ({ default: m.IslamicStoriesScreen })));
const MoreScreen = lazy(() => import('./screens/MoreScreen').then((m) => ({ default: m.MoreScreen })));
const OnThisDayScreen = lazy(() => import('./screens/OnThisDayScreen').then((m) => ({ default: m.OnThisDayScreen })));
const QiblaScreen = lazy(() => import('./screens/QiblaScreen').then((m) => ({ default: m.QiblaScreen })));
const CalendarScreen = lazy(() => import('./screens/CalendarScreen').then((m) => ({ default: m.CalendarScreen })));
const FlightPrayerScreen = lazy(() => import('./screens/FlightPrayerScreen').then((m) => ({ default: m.FlightPrayerScreen })));
const KhatmahScreen = lazy(() => import('./screens/KhatmahScreen').then((m) => ({ default: m.KhatmahScreen })));
const TadabburScreen = lazy(() => import('./screens/TadabburScreen').then((m) => ({ default: m.TadabburScreen })));
const HappinessWheelScreen = lazy(() => import('./screens/HappinessWheelScreen').then((m) => ({ default: m.HappinessWheelScreen })));
const MemorizationScreen = lazy(() => import('./screens/MemorizationScreen').then((m) => ({ default: m.MemorizationScreen })));
const OnboardingScreen = lazy(() => import('./screens/OnboardingScreen').then((m) => ({ default: m.OnboardingScreen })));
const SettingsDrawer = lazy(() => import('./components/SettingsDrawer').then((m) => ({ default: m.SettingsDrawer })));

export default function App() {
  const currentScreen = useStore((s) => s.currentScreen);
  const userName = useStore((s) => s.userName);
  const navigate = useStore((s) => s.navigate);
  const resetDailyTtsCredits = useStore((s) => s.resetDailyTtsCredits);
  const { theme, language, fontSize } = useStore();
  const { t } = useTranslation();

  useAthkarNotifications();
  useWirdReminder();
  useFocusMode();
  usePrayerNotifications();
  useChallengeSync();

  useEffect(() => {
    resetDailyTtsCredits();
  }, [resetDailyTtsCredits]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.documentElement.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.classList.remove('light-theme');
    }

    document.documentElement.classList.remove('font-sm', 'font-md', 'font-lg');
    document.documentElement.classList.add(`font-${fontSize}`);
  }, [language, theme, fontSize]);

  const getScreenContent = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />;
      case 'morning': return <AthkarScreen type="morning" />;
      case 'evening': return <AthkarScreen type="evening" />;
      case 'athkar_categories': return <AthkarCategoriesScreen />;
      case 'athkar_morning': return <AthkarScreen type="morning" />;
      case 'athkar_evening': return <AthkarScreen type="evening" />;
      case 'athkar_after_prayer': return <AthkarScreen type="after_prayer" />;
      case 'athkar_sleep': return <AthkarScreen type="sleep" />;
      case 'athkar_waking_up': return <AthkarScreen type="waking_up" />;
      case 'athkar_food': return <AthkarScreen type="food" />;
      case 'athkar_fasting': return <AthkarScreen type="fasting" />;
      case 'athkar_travel': return <AthkarScreen type="travel" />;
      case 'athkar_mosque': return <AthkarScreen type="mosque" />;
      case 'athkar_wudu': return <AthkarScreen type="wudu" />;
      case 'athkar_home': return <AthkarScreen type="home" />;
      case 'athkar_distress': return <AthkarScreen type="distress" />;
      case 'athkar_prayer': return <AthkarScreen type="prayer" />;
      case 'athkar_adhan': return <AthkarScreen type="adhan" />;
      case 'athkar_clothes': return <AthkarScreen type="clothes" />;
      case 'athkar_toilet': return <AthkarScreen type="toilet" />;
      case 'athkar_ruqyah': return <AthkarScreen type="ruqyah" />;
      case 'tasbih': return <TasbihScreen />;
      case 'kids': return <KidsHomeScreen />;
      case 'quran': return <QuranScreen />;
      case 'tasmee': return <TasmeeScreen />;
      case 'hadith': return <HadithQuizScreen />;
      case 'challenges': return <ChallengesScreen />;
      case 'rewards': return <RewardsScreen />;
      case 'ai': return <AIDuaScreen />;
      case 'tadabbur': return <TadabburScreen />;
      case 'full_quran': return <FullQuranScreen />;
      case 'surah': return <SurahScreen />;
      case 'prayer': return <PrayerTimesScreen />;
      case 'hadith_library': return <HadithLibraryScreen />;
      case 'islamic_stories': return <IslamicStoriesScreen />;
      case 'more': return <MoreScreen />;
      case 'on_this_day': return <OnThisDayScreen />;
      case 'qibla': return <QiblaScreen />;
      case 'calendar': return <CalendarScreen />;
      case 'flight_prayer': return <FlightPrayerScreen />;
      case 'khatmah': return <KhatmahScreen />;
      case 'happiness_wheel': return <HappinessWheelScreen />;
      case 'memorization': return <MemorizationScreen />;
      default: return <HomeScreen />;
    }
  };

  const isKidsMode = ['kids', 'quran', 'tasmee', 'hadith'].includes(currentScreen);

  const standardNav = [
    { id: 'home', name: t('nav.home'), icon: Home },
    { id: 'tasbih', name: t('nav.tasbih'), icon: Compass },
    { id: 'challenges', name: t('nav.challenges'), icon: Trophy },
    { id: 'rewards', name: t('nav.rewards'), icon: Star },
    { id: 'more', name: t('nav.more'), icon: LayoutGrid },
  ];

  const kidsNav = [
    { id: 'kids', name: t('nav.home'), icon: Home },
    { id: 'quran', name: t('nav.quran'), icon: Mic },
    { id: 'hadith', name: t('nav.hadith'), icon: MessageSquare },
    { id: 'rewards', name: t('nav.rewards'), icon: Star },
  ];

  const activeNav = isKidsMode ? kidsNav : standardNav;

  if (!userName) {
    return (
      <Suspense fallback={<AppLoader />}>
        <OnboardingScreen />
      </Suspense>
    );
  }

  return (
    <div className="app-frame w-full max-w-md mx-auto bg-dark h-screen max-h-screen flex flex-col overflow-hidden text-sm relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute top-1/3 -left-28 h-64 w-64 rounded-full bg-green/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,var(--th-text)_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <div className="flex-1 overflow-hidden relative z-10">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col"
          >
            <Suspense fallback={<AppLoader compact />}>
              {getScreenContent()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav className="relative z-20 mx-3 mb-3 flex shrink-0 items-center justify-around rounded-[1.75rem] border border-gold/15 bg-mid/90 px-1 pt-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] shadow-2xl shadow-black/25 backdrop-blur-xl">
        {activeNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'home' && currentScreen === 'morning') || 
            (item.id === 'home' && currentScreen === 'evening') ||
            (item.id === 'home' && currentScreen === 'ai') ||
            (item.id === 'home' && currentScreen.startsWith('athkar')) ||
            (item.id === 'more' && ['more', 'on_this_day', 'qibla', 'calendar', 'flight_prayer', 'khatmah', 'happiness_wheel', 'memorization'].includes(currentScreen));

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as Screen)}
              className={`relative flex min-w-14 flex-col items-center gap-1.5 rounded-2xl px-3 py-2 transition-all ${
                isActive ? 'text-gold bg-gold/10 shadow-inner shadow-gold/10' : 'text-light hover:bg-dark/30 hover:text-gold/80'
              }`}
            >
              <motion.div
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className={`text-[10px] ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
              {isActive && <motion.span layoutId="nav-indicator" className="absolute -bottom-1 h-1 w-6 rounded-full bg-gold" />}
            </button>
          );
        })}
      </nav>

        {/* Settings Drawer Overlay */}
      <Suspense fallback={null}>
        <SettingsDrawer />
      </Suspense>

      {/* Custom Alert Overlay */}
      <AlertModal />
    </div>
  );
}

function AppLoader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? 'h-full' : 'min-h-screen'} flex items-center justify-center bg-dark text-gold`}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        <span className="text-xs font-bold">جارٍ التحميل...</span>
      </div>
    </div>
  );
}

function AlertModal() {
  const alertMessage = useStore((s) => s.alertMessage);
  const hideAlert = useStore((s) => s.hideAlert);
  const { language } = useStore();

  if (!alertMessage) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-mid border border-gold/30 rounded-2xl p-6 shadow-2xl max-w-sm w-full relative -mt-20">
        <p className="text-light text-center font-bold text-lg whitespace-pre-wrap leading-relaxed">
          {alertMessage.text}
        </p>
        <button 
          onClick={hideAlert}
          className="mt-6 w-full py-3 bg-gold text-dark font-bold rounded-xl active:scale-95 transition-transform"
        >
          {language === 'ar' ? 'حسناً' : 'OK'}
        </button>
      </div>
    </div>
  );
}

