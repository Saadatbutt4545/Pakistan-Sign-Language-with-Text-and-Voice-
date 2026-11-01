import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FiActivity, FiTrendingUp, FiHash, FiRefreshCw, FiVolume2 } from 'react-icons/fi';
import Webcam from 'react-webcam';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function Recognition() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [detectedSign, setDetectedSign] = useState('');
  const [recentSigns, setRecentSigns] = useState([]);
  const [_isRecording, _setIsRecording] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    totalDetections: 0,
    gestureCounts: {},
    history: [],
  });

  const gestureBufferRef = useRef([]);
  const GESTURE_BUFFER_SIZE = 5;
  const STABLE_THRESHOLD = 3;


  
const speakText = async (text) => {
  if (!text) return;
  try {
    const audio = new Audio(`${API_BASE_URL}/speak/${text}`);
    await audio.play(); 
  } catch (error) {
    console.error("Audio play error:", error);
  }
};


  
  const isFingerFolded = (landmarks, indices) => {
    const tip = landmarks[indices[3]];
    const pip = landmarks[indices[1]];
    return tip.y > pip.y;
  };

  const isThumbFolded = (landmarks) => {
    const tip = landmarks[4];
    const mcp = landmarks[2];
    const wrist = landmarks[0];
    const distToMcp = Math.abs(tip.x - mcp.x) + Math.abs(tip.y - mcp.y);
    const distToWrist = Math.abs(tip.x - wrist.x) + Math.abs(tip.y - wrist.y);
    return distToMcp < 0.1 || distToWrist < 0.1;
  };

  const checkFistGesture = (landmarks) => {
    const fingers = {
      index: [5, 6, 7, 8],
      middle: [9, 10, 11, 12],
      ring: [13, 14, 15, 16],
      pinky: [17, 18, 19, 20],
    };
    for (const finger in fingers) {
      if (!isFingerFolded(landmarks, fingers[finger])) return false;
    }
    return isThumbFolded(landmarks);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current?.getScreenshot) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) sendImage(imageSrc);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const updateRecentSigns = (newSign) => {
    setRecentSigns((prevSigns) => {
      if (prevSigns[0] === newSign) return prevSigns;
      const updated = [newSign, ...prevSigns];
      return updated.slice(0, 5);
    });
  };

  const updateStableGesture = (newGesture) => {
    const buffer = gestureBufferRef.current;
    buffer.push(newGesture);
    if (buffer.length > GESTURE_BUFFER_SIZE) buffer.shift();
    const gestureCount = buffer.filter((g) => g === newGesture).length;

    if (gestureCount >= STABLE_THRESHOLD) {
      if (gesture !== newGesture) {
        setGesture(newGesture);
        setDetectedSign(newGesture);
        if (newGesture) updateRecentSigns(newGesture);
      }
    }
  };

  useEffect(() => {
    if (!detectedSign) return;
    setSessionStats((prev) => {
      const gestureCounts = { ...prev.gestureCounts };
      gestureCounts[detectedSign] = (gestureCounts[detectedSign] || 0) + 1;
      const historyEntry = { gesture: detectedSign, timestamp: new Date().toISOString() };
      return {
        totalDetections: prev.totalDetections + 1,
        gestureCounts,
        history: [historyEntry, ...prev.history].slice(0, 8),
      };
    });
  }, [detectedSign]);

  const mostFrequentGesture = useMemo(() => {
    const entries = Object.entries(sessionStats.gestureCounts);
    if (!entries.length) return null;
    return entries.reduce((top, current) => (current[1] > top[1] ? current : top));
  }, [sessionStats.gestureCounts]);

  const resetDashboard = () => {
    setSessionStats({ totalDetections: 0, gestureCounts: {}, history: [] });
  };

  const sendImage = async (imageSrc) => {
    const blob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append('file', blob, 'frame.jpg');

    try {
      const res = await axios.post(`${API_BASE_URL}/detect-hand/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const handsData = res.data.hands;
      drawHands(handsData);

      if (res.data.gesture) {
        updateStableGesture(res.data.gesture);
        setConfidence(res.data.confidence || 1);
      } else if (handsData.length > 0) {
        const hand = handsData[0];
        if (checkFistGesture(hand)) {
          updateStableGesture('A');
          setConfidence(0.8);
        } else {
          updateStableGesture('');
          setConfidence(0);
        }
      } else {
        updateStableGesture('');
        setConfidence(0);
      }
    } catch (e) {
      console.error('Error sending image', e);
      setConfidence(0);
    }
  };

  const drawHands = (handsData) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = webcamRef.current.video;
    if (!video) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'lime';
    ctx.fillStyle = 'red';

    handsData.forEach((hand) => {
      hand.forEach((landmark) => {
        const x = landmark.x * canvas.width;
        const y = landmark.y * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    });
  };

  const _toggleFullscreen = () => setIsFullscreen((prev) => !prev);
  const _toggleRecording = () => _setIsRecording((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera & Canvas Section */}
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'lg:col-span-2'}`}>
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden">
              <div className="relative w-[830px] h-[480px]">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={640}
                  height={480}
                  videoConstraints={{ facingMode: 'user' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: 'yellow',
                    textShadow: '2px 2px 5px black',
                    userSelect: 'none',
                  }}
                >
                  {gesture}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6">
            {/* Detection Results */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Detection Results</h2>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-2">Detected Sign:</p>
                <div className="text-xl font-semibold text-blue-600">{detectedSign || '...'}</div>

                {/* Dynamic Confidence Bar */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Confidence:</p>
                  <div className="bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Output */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Output</h2>
              <div className="bg-gray-50 rounded-2xl p-4 min-h-[100px]">
                <p className="text-gray-600">
                  {detectedSign ? `You signed: ${detectedSign}` : 'No text detected yet.'}
                </p>
              </div>

              {/* Play Audio Button */}
              <button
                onClick={() => speakText(detectedSign)}
                className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <FiVolume2 className="w-5 h-5" />
                <span>Play Audio</span>
              </button>
            </div>

              {/* Recent Signs - Quick Reference */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Signs</h2>
                  {recentSigns.length > 0 && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {recentSigns.length} detected
                    </span>
                  )}
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {recentSigns.length > 0 ? (
                    recentSigns.map((sign, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between rounded-xl p-3 transition-all ${
                          index === 0
                            ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                            : 'bg-gray-50 border border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              index === 0 ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'
                            }`}
                          ></div>
                          <span className={`font-medium ${index === 0 ? 'text-blue-900' : 'text-gray-700'}`}>
                            {sign}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {index === 0 ? 'Just now' : `${index * 0.3}s ago`}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <p className="text-sm">No signs detected yet.</p>
                      <p className="text-xs mt-1">Show signs to see them here</p>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>

        {/* Visual Separator */}
        <div className="mt-16 mb-8 border-t border-gray-200"></div>

        {/* Session Dashboard - Bottom Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Live Dashboard</h2>
              <p className="text-sm text-gray-500">Real-time statistics and session analytics</p>
            </div>
            <button
              type="button"
              onClick={resetDashboard}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-gray-200"
            >
              <FiRefreshCw />
              Reset
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard icon={<FiActivity />} label="Total Detections" value={sessionStats.totalDetections} />
            <StatCard
              icon={<FiHash />}
              label="Unique Gestures"
              value={Object.keys(sessionStats.gestureCounts).length}
            />
            <StatCard
              icon={<FiTrendingUp />}
              label="Top Gesture"
              value={mostFrequentGesture ? `${mostFrequentGesture[0]} (${mostFrequentGesture[1]})` : '––'}
              truncate
            />
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiActivity className="text-blue-600" />
              Session Timeline
            </p>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
              {sessionStats.history.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No detections recorded yet.</p>
                  <p className="text-xs mt-1">Start signing to see your activity here</p>
                </div>
              )}
              {sessionStats.history.map((entry, index) => (
                <div
                  key={`${entry.timestamp}-${index}`}
                  className="bg-white rounded-xl px-4 py-3 text-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 text-base">{entry.gesture}</span>
                    <span className="text-gray-500 text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const StatCard = ({ icon, label, value, truncate }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">{label}</span>
    </div>
    <p className={`text-3xl font-bold text-gray-900 ${truncate ? 'truncate' : ''}`}>
      {value}
    </p>
  </div>
);

export default Recognition;
