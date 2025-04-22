import React, { useState, useEffect, useRef } from 'react';

// Scan type configuration
const getLoaderConfig = (scanType) => {
    switch (scanType) {
        case 'DOM-BasedXss':
            return {
                minDuration: 10000,     // 10s before showing "taking longer" message
                maxDuration: 600000,    // 10m maximum expected duration
                estimatedDuration: 300000, // 5m average duration
                longLoadMessage: "XSS scan may take several minutes for complex sites..."
            };
        case 'Subdomain-Reconnaissance':
            return {
                minDuration: 15000,     // 15s
                maxDuration: 420000,    // 7m
                estimatedDuration: 240000, // 4m
                longLoadMessage: "Subdomain enumeration in progress. Large domains take longer..."
            };
        case 'SQLInjectionScanner':
            return {
                minDuration: 8000,      // 8s
                maxDuration: 300000,    // 5m
                estimatedDuration: 120000, // 2m
                longLoadMessage: "SQL injection testing requires thorough parameter checks..."
            };
        case 'Hidden-Files-Reconnaissance':
            return {
                minDuration: 5000,     // 5s
                maxDuration: 240000,    // 4m
                estimatedDuration: 90000, // 1.5m
                longLoadMessage: "Scanning for hidden files and directories..."
            };
        case 'GoogleHacking':
            return {
                minDuration: 3000,     // 3s
                maxDuration: 120000,    // 2m
                estimatedDuration: 30000, // 1.5m
                longLoadMessage: "Scanning for GoogleHacking..."
            }
        case 'emailAudit':
            return {
                minDuration: 4000,     // 5s
                maxDuration: 120000,    // 4m
                estimatedDuration: 40000, // 1.5m
                longLoadMessage: "Scanning for EmailAudit..."
            }
        case 'JSParser':
            return {
                minDuration: 6000,     // 5s
                maxDuration: 240000,    // 4m
                estimatedDuration: 40000, // 1.5m
                longLoadMessage: "Scanning for JSParser..."
            }
        case 'technologies':
            return {
                minDuration: 2000,     // 5s
                maxDuration: 6000,    // 4m
                estimatedDuration: 20000, // 1.5m
                longLoadMessage: "Scanning for technologies..."
            }
        default:
            return {
                minDuration: 5000,      // 5s
                maxDuration: 180000,    // 3m
                estimatedDuration: 60000, // 1m
                longLoadMessage: "Scan in progress. Please wait..."
            };
    }
};

const SmartLoader = ({
    isLoading,
    scanType
}) => {
    // Get timing configuration based on scan type
    const { minDuration, maxDuration, estimatedDuration, longLoadMessage } = getLoaderConfig(scanType);

    const [progress, setProgress] = useState(0);
    const [isTakingLong, setIsTakingLong] = useState(false);
    const startTime = useRef(null);
    const progressInterval = useRef(null);
    const longLoadTimeout = useRef(null);

    useEffect(() => {
        if (isLoading) {
            startTime.current = Date.now();
            setProgress(0);
            setIsTakingLong(false);

            // Smooth progress animation with realistic acceleration
            progressInterval.current = setInterval(() => {
                setProgress(prev => {
                    const elapsed = Date.now() - startTime.current;
                    const baseProgress = Math.min((elapsed / estimatedDuration) * 100, 90);
                    // Add slight randomness for more natural feel
                    const randomFactor = 1 + (Math.random() * 0.2 - 0.1);
                    return Math.min(prev + (randomFactor * 0.7), baseProgress);
                });
            }, 150);

            // Show "taking longer" message after minDuration
            longLoadTimeout.current = setTimeout(() => {
                setIsTakingLong(true);
            }, minDuration);

        } else {
            // Loading finished - complete the animation
            clearInterval(progressInterval.current);
            clearTimeout(longLoadTimeout.current);

            // Quickly complete to 100% when done
            setProgress(100);

            // Reset after animation completes
            const timeout = setTimeout(() => {
                setProgress(0);
                setIsTakingLong(false);
            }, 500);

            return () => clearTimeout(timeout);
        }

        return () => {
            clearInterval(progressInterval.current);
            clearTimeout(longLoadTimeout.current);
        };
    }, [isLoading, minDuration, maxDuration, estimatedDuration]);

    if (!isLoading && progress === 0) return null;

    return (
        <div className="smart-loader-container">
            <div
                className="progress-bar"
                style={{
                    width: `${progress}%`,
                    backgroundColor: isTakingLong ? '#ff9800' : '#04D2D2',
                    transition: progress < 5 ? 'none' : 'width 0.3s ease' // No transition at very start
                }}
            ></div>

            {isTakingLong && (
                <div className="long-load-message">
                    {longLoadMessage}
                    {progress < 50 && (
                        <span className="blinking-dots">...</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SmartLoader;