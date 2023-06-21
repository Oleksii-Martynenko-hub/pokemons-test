import { IPokemonStats } from 'src/api/MainApi';

import styles from './pokemon-stats.module.scss';

export interface PokemonStatsProps {
  stats: IPokemonStats[];
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <table className={styles.statsTable}>
      <thead>
        <tr>
          <th className={styles.nameHead}>Stat name</th>
          <th className={styles.baseStatHead}>Base stat</th>
          <th className={styles.effortHead}>Effort</th>
        </tr>
      </thead>

      <tbody>
        {stats.map(({ stat, base_stat, effort }) => (
          <tr key={stat.name}>
            <td className={styles.nameData}>{stat.name}</td>
            <td className={styles.baseStatData}>{base_stat}</td>
            <td className={styles.effortData}>{effort}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PokemonStats;
