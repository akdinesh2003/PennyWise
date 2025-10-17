import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { badges, leaderboard } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Crown } from 'lucide-react';

export function Rewards() {
  return (
    <Card className="shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-lg">Gamified Savings</CardTitle>
        <CardDescription>Your badges and rank.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Your Badges</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center gap-2 text-center" title={badge.name}>
                <div className="relative">
                  <badge.icon className={cn("h-10 w-10", badge.color)} />
                </div>
                <p className="text-xs font-medium truncate w-full">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Leaderboard</h3>
          <ul className="space-y-3">
            {leaderboard.map((user, index) => (
              <li key={user.id} className={cn(
                "flex items-center gap-3 p-2 rounded-lg",
                user.name === 'You' ? 'bg-primary/10 border border-primary/20' : ''
              )}>
                 {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                 {index > 0 && <span className="font-bold text-muted-foreground w-5 text-center">{index + 1}</span>}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://picsum.photos/seed/${user.avatarId}/40/40`} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-medium flex-grow truncate">{user.name}</p>
                <p className="font-semibold text-primary">{user.points.toLocaleString()} pts</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
