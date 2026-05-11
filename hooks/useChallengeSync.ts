import { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { useStore } from '../store';

export function useChallengeSync() {
  const [user, setUser] = useState<User | null>(null);
  const xp = useStore(state => state.xp);
  const userName = useStore(state => state.userName);
  const joinedChallenges = useStore(state => state.joinedChallenges);
  const lastSyncedXp = useRef(xp);

  useEffect(() => {
    if (joinedChallenges.length === 0) {
      setUser(null);
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    Promise.all([
      import('firebase/auth'),
      import('../firebase'),
    ])
      .then(([{ onAuthStateChanged }, { auth }]) => {
        if (!isMounted) return;
        unsubscribe = onAuthStateChanged(auth, setUser);
      })
      .catch(console.error);

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [joinedChallenges.length]);

  useEffect(() => {
    if (!user || joinedChallenges.length === 0) return;

    const timeoutId = window.setTimeout(() => {
      if (xp === lastSyncedXp.current) return;

      lastSyncedXp.current = xp;

      import('../services/challengesService')
        .then(({ challengesService }) => {
          joinedChallenges.forEach(code => {
            challengesService.updateMemberProgress(code, user.uid, xp, userName).catch(console.error);
          });
        })
        .catch(console.error);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [xp, user, joinedChallenges, userName]);
}
