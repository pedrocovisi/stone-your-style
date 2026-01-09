'use client';

import { useState } from 'react';
import styles from './Builder.module.css';

type AccessoryType = 'Choker' | 'Pulseira' | 'Brinco';
type WireType = 'Aço' | 'Elástico';
type StoneType =
    | 'Quartzo Rosa' | 'Granada' | 'Espinélio' | 'Apatita' | 'Peridoto'
    | 'Lápis Lazúli' | 'Rodocrosita' | 'Ametista' | 'Cianita' | 'Quartzo Cristal'
    | 'Quartzo Verde' | 'Ágata Negra' | 'Sodalita' | 'Unakita' | 'Fluorita'
    | 'Âmbar' | 'Mix de Ágata' | 'Ágata Indiana';
type FinishType = 'Prata' | 'Ouro Branco' | 'Folheado a Ouro';
type PendantType = 'Letra' | 'Nossa Senhora' | 'Espírito Santo';

interface BuilderState {
    type: AccessoryType | null;
    wire: WireType | null;
    size: string;
    stone: StoneType | null;
    finish: FinishType | null;
    pendantType: PendantType | null;
    pendantValue: string; // Keep the specific letter selection separate
}

const STONES: StoneType[] = [
    'Quartzo Rosa', 'Granada', 'Espinélio', 'Apatita', 'Peridoto',
    'Lápis Lazúli', 'Rodocrosita', 'Ametista', 'Cianita', 'Quartzo Cristal',
    'Quartzo Verde', 'Ágata Negra', 'Sodalita', 'Unakita', 'Fluorita',
    'Âmbar', 'Mix de Ágata', 'Ágata Indiana'
];

export default function Builder() {
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState<BuilderState>({
        type: null,
        wire: null,
        size: '',
        stone: null,
        finish: null,
        pendantType: null,
        pendantValue: ''
    });

    // Prices for stones based on the accessory type
    const STONE_PRICES_BY_TYPE: Record<string, number> = {
        'Choker': 80,
        'Pulseira': 50,
        'Brinco': 30
    };

    const getPrice = () => {
        let price = 0;

        // Step 1 selected type determines stone price in Step 3
        if (selections.stone && selections.type) {
            price += STONE_PRICES_BY_TYPE[selections.type];
        }

        // Step 4: Finishes (R$10)
        if (selections.finish) {
            price += 10;
        }
        // Step 5: Pendants (R$20)
        if (selections.pendantType) {
            price += 20;
        }
        return price;
    };

    const handleNext = () => {
        if (step === 1 && selections.type === 'Brinco') {
            setStep(3); // Skip measurements for earrings
        } else {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (step === 3 && selections.type === 'Brinco') {
            setStep(1); // Go back to type selection from stones if earrings
        } else {
            setStep((prev) => prev - 1);
        }
    };

    const updateSelection = (field: keyof BuilderState, value: any) => {
        setSelections((prev) => ({ ...prev, [field]: value }));
    };

    const renderStep1 = () => (
        <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>1. Escolha o tipo de acessório</h2>
            <div className={styles.gridOptions}>
                {['Choker', 'Pulseira', 'Brinco'].map((type) => (
                    <button
                        key={type}
                        className={`${styles.optionCard} ${selections.type === type ? styles.selected : ''}`}
                        onClick={() => {
                            updateSelection('type', type);
                            // Reset wire if not pulseira
                            if (type !== 'Pulseira') updateSelection('wire', null);
                        }}
                    >
                        <span className={styles.cardTitle}>{type}</span>
                    </button>
                ))}
            </div>

            {selections.type === 'Pulseira' && (
                <div className={styles.subOption}>
                    <h3 className={styles.inputLabel}>Tipo de Fio:</h3>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="wire"
                            value="Aço"
                            checked={selections.wire === 'Aço'}
                            onChange={() => updateSelection('wire', 'Aço')}
                        />
                        Aço
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="wire"
                            value="Elástico"
                            checked={selections.wire === 'Elástico'}
                            onChange={() => updateSelection('wire', 'Elástico')}
                        />
                        Elástico
                    </label>
                </div>
            )}
        </div>
    );

    const renderStep2 = () => (
        <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>2. Informe a Medida</h2>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
                {selections.type === 'Choker'
                    ? 'Meça a circunferência do seu pescoço em cm.'
                    : 'Meça a circunferência do seu pulso em cm.'}
            </p>
            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Medida (cm)</label>
                <input
                    type="number"
                    className={styles.inputField}
                    value={selections.size}
                    onChange={(e) => updateSelection('size', e.target.value)}
                    placeholder="Ex: 16"
                    min="10"
                    max="50"
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>{selections.type === 'Brinco' ? '2' : '3'}. Escolha a Pedra Natural</h2>
            <div className={styles.gridOptions}>
                {STONES.map((stone) => {
                    const price = selections.type ? STONE_PRICES_BY_TYPE[selections.type] : 0;
                    return (
                        <button
                            key={stone}
                            className={`${styles.optionCard} ${selections.stone === stone ? styles.selected : ''}`}
                            onClick={() => updateSelection('stone', stone)}
                        >
                            <span className={styles.cardTitle}>{stone}</span>
                            <span className={styles.cardPrice}>+ R$ {price},00</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className={styles.stepContainer}>
            <h2 className={styles.stepTitle}>{selections.type === 'Brinco' ? '3' : '4'}. Tips e Acabamentos</h2>
            <div className={styles.gridOptions}>
                {['Prata', 'Ouro Branco', 'Folheado a Ouro'].map((finish) => (
                    <button
                        key={finish}
                        className={`${styles.optionCard} ${selections.finish === finish ? styles.selected : ''}`}
                        onClick={() => updateSelection('finish', finish)}
                    >
                        <span className={styles.cardTitle}>{finish}</span>
                        <span className={styles.cardPrice}>+ R$ 10,00</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep5 = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        return (
            <div className={styles.stepContainer}>
                <h2 className={styles.stepTitle}>{selections.type === 'Brinco' ? '4' : '5'}. Pingentes</h2>
                <div className={styles.gridOptions}>
                    {['Letra', 'Nossa Senhora', 'Espírito Santo'].map((pType) => (
                        <button
                            key={pType}
                            className={`${styles.optionCard} ${selections.pendantType === pType ? styles.selected : ''}`}
                            onClick={() => {
                                updateSelection('pendantType', pType);
                                if (pType !== 'Letra') updateSelection('pendantValue', '');
                            }}
                        >
                            <span className={styles.cardTitle}>{pType}</span>
                            <span className={styles.cardPrice}>+ R$ 20,00</span>
                        </button>
                    ))}
                </div>

                {selections.pendantType === 'Letra' && (
                    <div className={styles.subOption}>
                        <h3 className={styles.inputLabel}>Selecione a Letra:</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {letters.map((char) => (
                                <button
                                    key={char}
                                    onClick={() => updateSelection('pendantValue', char)}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        border: selections.pendantValue === char ? '1px solid var(--accent)' : '1px solid #ddd',
                                        background: selections.pendantValue === char ? 'var(--accent)' : '#fff',
                                        color: selections.pendantValue === char ? '#fff' : '#000',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                if (!selections.type) return false;
                if (selections.type === 'Pulseira' && !selections.wire) return false;
                return true;
            case 2:
                return selections.size.length > 0;
            case 3:
                return !!selections.stone;
            case 4:
                return !!selections.finish;
            case 5:
                if (!selections.pendantType) return false;
                if (selections.pendantType === 'Letra' && !selections.pendantValue) return false;
                return true;
            default:
                return false;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Monte sua Peça Exclusiva</h1>
                <div className={styles.priceTag}>
                    Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getPrice())}
                </div>
            </header>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}

            <div className={styles.navigation}>
                {step > 1 && (
                    <button className={`${styles.navButton} ${styles.backButton}`} onClick={handleBack}>
                        Voltar
                    </button>
                )}
                <div style={{ flex: step === 1 ? 1 : 0 }} /> {/* Spacer logic */}

                {step < 5 ? (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={handleNext}
                        disabled={!isStepValid()}
                    >
                        Próximo
                    </button>
                ) : (
                    <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        disabled={!isStepValid()}
                        onClick={() => alert('Em breve: Funcionalidade de checkout!')}
                    >
                        Finalizar Pedido
                    </button>
                )}
            </div>
        </div>
    );
}
